<template>
    <div id="map" class="map">
        <canvas id="search-map"></canvas>
    </div>
</template>

<script>
    let ProblemGraphVisualisation = require('./../../node_modules/problem-graph-visualisation/dist/problem-graph-visualisation.node.min')
    let data = {
        canvas: null
    }
    export default {
        name: 'SearchMap',
        props: ['nodes'],
        data: function () {
            return data
        },
        created: function () {
            this.$nextTick(function () {
                let map = document.getElementById('map')
                this.canvas = new ProblemGraphVisualisation.Canvas({
                    'element': document.getElementById('search-map'),
                    'height': map.offsetHeight,
                    'width': map.offsetWidth
                })
            })
        },
        watch: {
            nodes: function (val) {
                let baseLevel = new ProblemGraphVisualisation.Level('baseLevel', {
                    'nodes': val,
                    'nodeColor': '#6189A5',
                    'lineColor': '#6189A5',
                    'textColor': '#e34f00'
                })
                this.canvas.addLevel(baseLevel)
                this.canvas.update()
            }
        }
    }
</script>

<style scoped>
    .map {
        flex-grow: 1;
    }
</style>
