<template>
    <div id="explorer" class="explorer">
        <search-menu v-on:updateSearch="updateSearch" v-on:updateMap="updateMap"></search-menu>
        <search-map></search-map>
        <modal name="select" height="auto">
            <div class="modal">
                Please select a start and a goal node.
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
        problem: null
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
                this.$eventHub.$on('click-canvas', this.findNode)
            },
            updateSearch: function (value) {
                if (this.start === null || this.goal === null) {
                    this.$modal.show('select')
                    return false
                }
                this.problem = new ProblemSearch.Problem(this.map.getNodes(), this.start, this.goal)
            },
            updateMap: function (value) {
                let mapElement = document.getElementById('map')
                this.map = new ProblemMapGenerator.Map({
                    'cols': parseInt(value.cols, 10),
                    'rows': parseInt(value.rows, 10),
                    'width': mapElement.offsetWidth,
                    'height': mapElement.offsetHeight
                })
                this.map.injectRandom(ProblemMapGenerator.Random)
                this.start = null
                this.goal = null
                this.$eventHub.$emit('nodes', this.map.getNodes())
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
            },
            findNode: function (position) {
                let node = this.map.findNodeByPosition(position)
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
    }

    .modal {
        background: #6189A5;
        padding: 20px;
    }
</style>
