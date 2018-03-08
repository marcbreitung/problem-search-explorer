<template>
    <div id="explorer" class="explorer">
        <search-menu v-on:updateSearch="updateSearch" v-on:updateMap="updateMap"></search-menu>
        <search-map></search-map>
        <modal name="select" height="auto">
            <div class="modal">
                Please select a start and a goal node.
            </div>
        </modal>
        <modal name="solution" height="auto">
            <div class="modal">
                No solution found.
            </div>
        </modal>
        <modal name="map" height="auto">
            <div class="modal">
                You must generate a map. Please click the "Build Map" button.
            </div>
        </modal>
        <modal name="limit" height="auto">
            <div class="modal">
                Maximum depth limit reached.
            </div>
        </modal>
    </div>
</template>

<script>
    import SearchMenu from './SearchMenu.vue'
    import SearchMap from './SearchMap.vue'

    let ProblemMapGenerator = require('./../../node_modules/problem-map-generator/dist/problem-map-generator.node.min')
    let ProblemSearch = require('./../../node_modules/problem-search/dist/problem-search.node.min')
    let data = {
        start: null,
        goal: null,
        map: null,
        mapElement: null,
        searchStrategyFabric: null,
        searchStrategy: null,
        mapHasNodes: false
    }

    export default {
        components: {SearchMap, SearchMenu},
        name: 'Explorer',
        data: function () {
            return data
        },
        created: function () {
            this.$nextTick(this.init)
        },
        methods: {
            init: function () {
                this.mapElement = document.getElementById('map')
                this.searchStrategyFactory = new ProblemSearch.StrategyFactory()
                this.searchStrategyFactory.registerStrategy('BreadthFirstSearch', ProblemSearch.BreadthFirstSearch)
                this.searchStrategyFactory.registerStrategy('UniformCostSearch', ProblemSearch.UniformCostSearch)
                this.searchStrategyFactory.registerStrategy('DepthFirstSearch', ProblemSearch.DepthFirstSearch)
                this.searchStrategyFactory.registerStrategy('DepthLimitedSearch', ProblemSearch.DepthLimitedSearch)
                this.searchStrategyFactory.registerStrategy('GreedyBestFirstSearch', ProblemSearch.GreedyBestFirstSearch)
                this.searchStrategyFactory.registerStrategy('AStarSearch', ProblemSearch.AStarSearch)
                this.$eventHub.$on('click-canvas', this.findNode)
                this.map = new ProblemMapGenerator.Map({})
            },
            updateSearch: function (value) {
                let graph, problem, result
                if (this.mapHasNodes === false) {
                    this.$modal.show('map')
                    return false
                }
                if (this.start === null || this.goal === null) {
                    this.$modal.show('select')
                    return false
                }
                this.searchStrategy = this.searchStrategyFactory.getStrategy(value.searchStrategy, value.strategyOptions)
                graph = new ProblemSearch.Graph()
                graph.addNodes(this.map.getNodes())
                problem = new ProblemSearch.Problem(graph, new ProblemSearch.State(this.start), new ProblemSearch.State(this.goal))
                try {
                    result = this.searchStrategy.search(problem)
                    this.$eventHub.$emit('solution', result.solutionGraph())
                    this.$eventHub.$emit('statistic', {
                        'cost': result.solution().pop().pathCost,
                        'nodes': result.solution().length,
                        'explored': this.searchStrategy.explored.length
                    })
                    this.$eventHub.$emit('explored', this.searchStrategy.explored.map((node) => node.state.node))
                } catch (e) {
                    if (e.name === 'NoSolutionException') {
                        this.$modal.show('solution')
                    }
                    if (e.name === 'LimitException') {
                        this.$modal.show('limit')
                    }
                }
            },
            updateMap: function (value) {
                this.map.setSettings({
                    'cols': parseInt(value.cols, 10),
                    'rows': parseInt(value.rows, 10),
                    'width': this.mapElement.offsetWidth,
                    'height': this.mapElement.offsetHeight
                })
                this.map.injectRandom(ProblemMapGenerator.Random)
                this.start = null
                this.goal = null
                this.mapHasNodes = true
                this.$eventHub.$emit('nodes', this.map.getNodes())
                this.$eventHub.$emit('statistic', {
                    'cost': 0,
                    'nodes': 0,
                    'explored': 0
                })
            },
            addNode: function (node) {
                if (this.start === null && this.goal === null) {
                    this.start = node
                    this.$eventHub.$emit('start', this.start)
                    return false
                }
                if (this.start !== null && this.goal === null) {
                    this.goal = node
                    this.$eventHub.$emit('goal', this.goal)
                    return true
                }
                if (this.start !== null && this.goal !== null) {
                    this.goal = null
                    this.start = node
                    this.$eventHub.$emit('start', this.start)
                    return true
                }
            },
            findNode: function (position) {
                let node = this.map.findNodeByPosition(position, 10)
                if (node) {
                    this.addNode(node)
                }
            }
        }
    }
</script>

<style scoped>
    .explorer {
        display: flex;
        align-items: stretch;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        flex-direction: column-reverse;
    }

    .modal {
        background: #E15130;
        color: #fff;
        padding: 20px;
        text-align: center;
    }

    @media (min-width: 769px) {
        .explorer {
            flex-direction: row;
        }
    }

</style>
