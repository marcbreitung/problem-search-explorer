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
                this.visualisation.rendererFabric.registerRenderer('node', ProblemGraphVisualisation.NodesRenderer)
                this.visualisation.rendererFabric.registerRenderer('text', ProblemGraphVisualisation.TextRenderer)
            },
            initEvents: function () {
                this.$eventHub.$on('nodes', this.addBaseLevel)
                this.$eventHub.$on('start', this.addStart)
                this.$eventHub.$on('goal', this.addGoal)
            },
            addBaseLevel: function (nodes) {
                this.visualisation.removeLevelByName('startLevel')
                this.visualisation.removeLevelByName('goalLevel')
                this.visualisation.removeLevelByName('baseLevel')
                let baseLevel = new ProblemGraphVisualisation.Level('baseLevel', {
                    'type': 'node',
                    'nodes': nodes,
                    'nodeColor': '#6189A5',
                    'lineColor': '#6189A5',
                    'textColor': '#e34f00',
                    'nodeSize': 5
                })
                this.visualisation.addLevel(baseLevel)
                this.visualisation.update()
            },
            addStart: function (node) {
                node.label = 'A'
                let startLevel = new ProblemGraphVisualisation.Level('startLevel', {
                    'type': 'text',
                    'nodes': [node],
                    'nodeColor': '#507b0f',
                    'lineColor': '#000000',
                    'textColor': '#e7e7e7',
                    'nodeSize': 12,
                    'textSize': 12
                })
                this.visualisation.addLevel(startLevel)
                this.visualisation.update()
            },
            addGoal: function (node) {
                node.label = 'B'
                let goalLevel = new ProblemGraphVisualisation.Level('goalLevel', {
                    'type': 'text',
                    'nodes': [node],
                    'nodeColor': '#e34f00',
                    'lineColor': '#000000',
                    'textColor': '#e7e7e7',
                    'nodeSize': 12,
                    'textSize': 12
                })
                this.visualisation.addLevel(goalLevel)
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
