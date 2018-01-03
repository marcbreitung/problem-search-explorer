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
                this.visualisation.rendererFabric.registerRenderer('solution', ProblemGraphVisualisation.SolutionRenderer)
            },
            initEvents: function () {
                this.$eventHub.$on('nodes', this.addNodes)
                this.$eventHub.$on('start', this.addStart)
                this.$eventHub.$on('goal', this.addGoal)
                this.$eventHub.$on('solution', this.addSolution)
            },
            addNodes: function (nodes) {
                this.visualisation.removeLevelByName('startLevel')
                this.visualisation.removeLevelByName('goalLevel')
                this.visualisation.removeLevelByName('baseLevel')
                this.visualisation.removeLevelByName('solutionLevel')
                let baseLevel = new ProblemGraphVisualisation.Level('baseLevel', {
                    'type': 'node',
                    'sorting': 0,
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
                this.resetSolution()
                node.label = 'A'
                let startLevel = new ProblemGraphVisualisation.Level('startLevel', {
                    'type': 'text',
                    'sorting': 3,
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
                    'sorting': 4,
                    'nodes': [node],
                    'nodeColor': '#e34f00',
                    'lineColor': '#000000',
                    'textColor': '#e7e7e7',
                    'nodeSize': 12,
                    'textSize': 12
                })
                this.visualisation.addLevel(goalLevel)
                this.visualisation.update()
            },
            addSolution: function (nodes) {
                let solutionLevel = new ProblemGraphVisualisation.Level('solutionLevel', {
                    'type': 'solution',
                    'sorting': 2,
                    'nodes': nodes,
                    'nodeColor': '#e7e7e7',
                    'lineColor': '#e7e7e7',
                    'textColor': '#e7e7e7',
                    'lineSize': 2
                })
                this.visualisation.addLevel(solutionLevel)
                this.visualisation.update()
            },
            resetSolution: function () {
                this.visualisation.removeLevelByName('startLevel')
                this.visualisation.removeLevelByName('goalLevel')
                this.visualisation.removeLevelByName('solutionLevel')
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
