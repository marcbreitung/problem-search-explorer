<template>
    <div id="explorer" class="explorer">
        <search-menu v-on:updateSearch="updateSearch" v-on:updateMap="updateMap"></search-menu>
        <search-map></search-map>
    </div>
</template>

<script>
    import SearchMenu from './SearchMenu.vue'
    import SearchMap from './SearchMap.vue'

    let ProblemMapGenerator = require('./../../node_modules/problem-map-generator/dist/problem-map-generator.node.min')
    let data = {
        start: null,
        goal: null,
        map: null,
        problemBuilder: null
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
                console.log(value.searchStrategy)
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
                this.$eventHub.$emit('nodes', this.map.getNodes())
            },
            addNode: function (node) {
                if (this.start === null && this.goal === null) {
                    this.start = node
                    return false
                }
                if (this.start !== null && this.goal === null) {
                    this.goal = node
                    return true
                }
            },
            findNode: function (position) {
                let node = this.map.findNodeByPosition(position)
                if (node) {
                    this.addNode(node)
                    console.log(node)
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
</style>
