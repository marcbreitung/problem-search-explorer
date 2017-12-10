<template>
    <div id="map" class="map">
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
    let ProblemGraphVisualisation = require('./../../node_modules/problem-graph-visualisation/dist/problem-graph-visualisation.node.min')
    let data = {
        map: null,
        canvas: null,
        visualisation: null
    }
    export default {
        name: 'SearchMap',
        data: function () {
            return data
        },
        created: function () {
            this.$nextTick(this.initEvents)
            this.$nextTick(this.init)
        },
        methods: {
            init: function () {
                this.map = document.getElementById('map')
                this.canvas = document.getElementById('canvas')
                this.canvas.addEventListener('click', (e) => {
                    this.$eventHub.$emit('click-canvas', {'x': e.offsetX, 'y': e.offsetY})
                }, false)
                this.visualisation = new ProblemGraphVisualisation.Canvas({
                    'element': this.canvas,
                    'height': this.map.offsetHeight,
                    'width': this.map.offsetWidth,
                    'background': '#223143'
                })
            },
            initEvents: function () {
                this.$eventHub.$on('nodes', this.addBaseLevel)
                this.$eventHub.$on('start', this.addStartLevel)
                this.$eventHub.$on('goal', this.addGoalLevel)
            },
            addBaseLevel: function (nodes) {
                let baseLevel = new ProblemGraphVisualisation.Level('baseLevel', {
                    'nodes': nodes,
                    'nodeColor': '#6189A5',
                    'lineColor': '#6189A5',
                    'textColor': '#e34f00'
                })
                this.visualisation.addLevel(baseLevel)
                this.visualisation.update()
            },
            addStartLevel: function (nodes) {
                let baseLevel = new ProblemGraphVisualisation.Level('baseLevel', {
                    'nodes': nodes,
                    'nodeColor': '#6189A5',
                    'lineColor': '#6189A5',
                    'textColor': '#e34f00'
                })
                this.visualisation.addLevel(baseLevel)
                this.visualisation.update()
            }
        }
    }
</script>

<style scoped>
    .map {
        flex-grow: 1;
    }
</style>
