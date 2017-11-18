<template>
    <div id="explorer" class="explorer">
        <search-menu v-on:updateSearch="updateSearch" v-on:updateMap="updateMap"></search-menu>
        <search-map v-bind:nodes="nodes"></search-map>
    </div>
</template>

<script>
    import SearchMenu from './SearchMenu.vue'
    import SearchMap from './SearchMap.vue'
    let ProblemMapGenerator = require('./../../node_modules/problem-map-generator/dist/problem-map-generator.node.min')

    export default {
        components: {SearchMap, SearchMenu},
        name: 'Explorer',
        data: function () {
            return {
                nodes: []
            }
        },
        methods: {
            updateSearch: function (value) {
                console.log(value.searchStrategy)
            },
            updateMap: function (value) {
                let map = new ProblemMapGenerator.Map({'cols': parseInt(value.cols, 10), 'rows': parseInt(value.rows, 10), 'width': 10, 'height': 10})
                map.injectRandom(ProblemMapGenerator.Random)
                this.nodes = map.getNodes()
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
