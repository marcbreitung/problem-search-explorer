<template>
    <div id="map" class="map">
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
    let ProblemGraphVisualisation = require('problem-graph-visualisation')
    let data = {
        map: null,
        canvas: null,
        visualisation: null,
        showExplored: false,
        explored: null
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
                    'background': '#D9CFC7'
                })
                this.visualisation.rendererFactory.registerRenderer('node', ProblemGraphVisualisation.NodesRenderer)
                this.visualisation.rendererFactory.registerRenderer('text', ProblemGraphVisualisation.TextRenderer)
                this.visualisation.rendererFactory.registerRenderer('solution', ProblemGraphVisualisation.SolutionRenderer)
                this.visualisation.rendererFactory.registerRenderer('highlight-node', ProblemGraphVisualisation.HighlightNodeRenderer)
            },
            initEvents: function () {
                this.$eventHub.$on('nodes', this.addNodes)
                this.$eventHub.$on('start', this.addStart)
                this.$eventHub.$on('goal', this.addGoal)
                this.$eventHub.$on('solution', this.addSolution)
                this.$eventHub.$on('explored', this.addExplored)
                this.$eventHub.$on('toggleExplored', this.onToggleExplored)
            },
            onToggleExplored: function (value) {
                this.showExplored = value
                this.visualisation.removeLayerByName('exploredLayer')
                this.visualisation.update()
                if (this.showExplored && this.explored) {
                    this.addExplored(this.explored)
                }
            },
            addNodes: function (nodes) {
                this.explored = null
                this.visualisation.resize({'height': this.map.offsetHeight, 'width': this.map.offsetWidth})
                this.visualisation.removeLayerByName('baseLayer')
                this.visualisation.removeLayerByName('solutionLayer')
                this.visualisation.removeLayerByName('exploredLayer')
                this.visualisation.removeLayerByName('startLayer')
                this.visualisation.removeLayerByName('goalLayer')
                let baseLayer = new ProblemGraphVisualisation.Layer('baseLayer', {
                    'type': 'node',
                    'sorting': 0,
                    'nodes': nodes,
                    'nodeColor': '#656A73',
                    'lineColor': '#656A73',
                    'textColor': '#656A73',
                    'lineSize': 1,
                    'nodeSize': 5
                })
                this.visualisation.addLayer(baseLayer)
                this.visualisation.update()
            },
            addExplored: function (nodes) {
                this.explored = nodes
                if (this.showExplored) {
                    let exploredLayer = new ProblemGraphVisualisation.Layer('exploredLayer', {
                        'type': 'highlight-node',
                        'sorting': 1,
                        'nodes': nodes,
                        'nodeColor': '#e7e7e7',
                        'nodeSize': 3
                    })
                    this.visualisation.addLayer(exploredLayer)
                    this.visualisation.update()
                } else {
                    this.visualisation.removeLayerByName('exploredLayer')
                    this.visualisation.update()
                }
            },
            addStart: function (node) {
                this.resetSolution()
                node.label = 'A'
                let startLayer = new ProblemGraphVisualisation.Layer('startLayer', {
                    'type': 'text',
                    'sorting': 4,
                    'nodes': [node],
                    'nodeColor': '#507b0f',
                    'lineColor': '#000000',
                    'textColor': '#e7e7e7',
                    'nodeSize': 12,
                    'textSize': 12
                })
                this.visualisation.addLayer(startLayer)
                this.visualisation.update()
            },
            addGoal: function (node) {
                node.label = 'B'
                let goalLayer = new ProblemGraphVisualisation.Layer('goalLayer', {
                    'type': 'text',
                    'sorting': 5,
                    'nodes': [node],
                    'nodeColor': '#e34f00',
                    'lineColor': '#000000',
                    'textColor': '#e7e7e7',
                    'nodeSize': 12,
                    'textSize': 12
                })
                this.visualisation.addLayer(goalLayer)
                this.visualisation.update()
            },
            addSolution: function (nodes) {
                let solutionLayer = new ProblemGraphVisualisation.Layer('solutionLayer', {
                    'type': 'solution',
                    'sorting': 2,
                    'nodes': nodes,
                    'nodeColor': '#e34f00',
                    'lineColor': '#e34f00',
                    'textColor': '#e34f00',
                    'lineSize': 3
                })
                this.visualisation.addLayer(solutionLayer)
                this.visualisation.update()
            },
            resetSolution: function () {
                this.explored = null
                this.visualisation.removeLayerByName('solutionLayer')
                this.visualisation.removeLayerByName('exploredLayer')
                this.visualisation.removeLayerByName('startLayer')
                this.visualisation.removeLayerByName('goalLayer')
                this.visualisation.update()
            }
        }
    }
</script>

<style scoped>
    .map {
        flex-grow: 1;
        overflow: hidden;
    }
</style>
