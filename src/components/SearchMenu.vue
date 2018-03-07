<template>
    <div id="menu" class="menu" v-bind:class="{ 'menu--closed': isClosed }">

        <h1 class="menu__header">Problem Search Explorer
            <a href="#" id="openMenu" v-on:click="isClosed = !isClosed">
                <i class="fa fa-bars" aria-hidden="true" v-if="isClosed"></i>
                <i class="fa fa-times" aria-hidden="true" v-else></i>
            </a>
        </h1>

        <div class="menu__section section">
            <h2 class="section__header">Search</h2>
            <label class="form__label">Search Strategy</label>
            <div class="form__row">
                <div class="select__icon">
                    <select v-model="searchStrategy" @change="onChangeStrategy()" class="form__input menu__select">
                        <optgroup label="Uninformed Search">
                            <option value="BreadthFirstSearch">Breadth First Search</option>
                            <option value="UniformCostSearch">Uniform Cost Search</option>
                            <option value="DepthFirstSearch">Depth First Search</option>
                            <option value="DepthLimitedSearch">Depth Limited Search</option>
                        </optgroup>
                        <optgroup label="Informed Search">
                            <option value="GreedyBestFirstSearch">Greedy Best First Search</option>
                        </optgroup>
                    </select>
                </div>
            </div>
            <div class="form__row" v-if="isLimit">
                <label class="form__label form__label--small">Depth Limit</label>
                <input type="number" class="form__input form__input--small" v-model="strategyOptions.limit"
                       placeholder="Depth Limit"
                       step="1" min="1">
            </div>
            <div class="form__row">
                <button class="form__input form__button" v-on:click="doSearch">Search</button>
            </div>
        </div>

        <div class="menu__section section">
            <h2 class="section__header">Statistics</h2>
            <div class="form__row">
                <span class="form__label form__label--small">Path Cost</span>
                <div class="form__input form__input--small">{{ stats.cost }}</div>
            </div>
            <div class="form__row">
                <span class="form__label form__label--small">Path Nodes</span>
                <div class="form__input form__input--small">{{ stats.nodes }}</div>
            </div>
            <div class="form__row">
                <span class="form__label form__label--small">Explored</span>
                <div class="form__input form__input--small">{{ stats.explored }}</div>
            </div>
        </div>
        <div class="menu__section section">
            <h2 class="section__header">Settings</h2>
            <div class="form__row">
                <span class="form__label">
                    <input id="showExplored" type="checkbox" class="checkbox" v-model="showExplored"
                           @change="onToggleExplored()">
                    <label class="checkbox-label" for="showExplored">Show Explored</label>
                </span>
            </div>
        </div>
        <div class="menu__section section">
            <h2 class="section__header">Map</h2>
            <div class="form__row">
                <label class="form__label form__label--small">Columns</label>
                <input type="number" class="form__input form__input--small" v-model="cols"
                       placeholder="Columns (e.g. 10)" step="1" min="1" max="50">
            </div>
            <div class="form__row">
                <label class="form__label form__label--small">Rows</label>
                <input type="number" class="form__input form__input--small" v-model="rows" placeholder="Rows (e.g. 10)"
                       step="1" min="1" max="50">
            </div>
            <div class="form__row">
                <button class="form__input form__button" v-on:click="onChangeMap">Build Map</button>
            </div>
        </div>
        <div class="menu__section section">
            <a href="https://github.com/marcbreitung/problem-search-explorer" class="link" target="_blank"><i
                    class="fa fa-github fa-fw" aria-hidden="true"></i>Problem Search Explorer</a>
        </div>

    </div>
</template>

<script>
    let data = {
        searchStrategy: 'BreadthFirstSearch',
        cols: '10',
        rows: '10',
        strategyOptions: {
            limit: '10'
        },
        isLimit: false,
        showExplored: false,
        stats: {
            cost: 0,
            nodes: 0,
            explored: 0
        },
        isClosed: false
    }

    export default {
        name: 'SearchMenu',
        data: function () {
            return data
        },
        created: function () {
            this.$nextTick(this.initEvents)
        },
        methods: {
            initEvents: function () {
                this.$eventHub.$on('statistic', this.addStatistic)
            },
            onChangeStrategy: function () {
                this.isLimit = this.searchStrategy === 'DepthLimitedSearch'
            },
            doSearch: function () {
                this.$emit('updateSearch', data)
            },
            onChangeMap: function () {
                this.$emit('updateMap', data)
            },
            onToggleExplored: function () {
                this.$eventHub.$emit('toggleExplored', this.showExplored)
            },
            addStatistic: function (solution) {
                this.stats.cost = (Math.round(solution.cost * 10000) / 10000).toFixed(4)
                this.stats.nodes = solution.nodes
                this.stats.explored = solution.explored
            }
        }
    }
</script>

<style scoped>

    #openMenu {
        display: block;
        float: right;
        cursor: pointer;
        background: #6189A5;
        width: 25px;
        text-align: center;
        color: #fff;
        height: 25px;
        line-height: 25px;
        position: absolute;
        top: -25px;
    }

    .menu {
        background: #6189A5;
        min-width: 255px;
        position: absolute;
        width: 100%;
        transition: all .25s ease-in-out;
    }

    .menu--closed {
        transform: translate(0, 100%);
    }

    .menu__section {
        padding: .5em;
        border-bottom: 1px solid #283144;
    }

    .menu__header {
        font-size: .8em;
        margin: 0;
        padding: .5em;
        color: #223143;
        text-transform: uppercase;
        font-weight: bold;
        border-bottom: 1px solid #283144;
    }

    .section__header {
        font-size: .8em;
        margin: 0;
        padding: 0;
        color: #223143;
        text-transform: uppercase;
        font-weight: bold;
    }

    .form__row {
        margin-bottom: .25em;
        position: relative;
    }

    .form__row:after {
        content: '';
        clear: both;
        display: block;
        visibility: hidden;
        height: 0;
    }

    .form__input {
        width: 100%;
        appearance: none;
        border: none;
        border-radius: 0;
        font-size: 0.75em;
        padding: .6em .6em;
        background: #223143;
        color: #fff;
        overflow: hidden;
    }

    .form__input--small {
        width: 50%;
        float: right;
    }

    .checkbox {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
        border-radius: 0;
        font-size: 1em;
        width: 100%;
    }

    .checkbox:checked,
    .checkbox:not(:checked) {
        background: transparent;
        position: absolute;
        visibility: hidden;
        margin: 0;
        padding: 0;
    }

    .checkbox + label {
        cursor: pointer;
    }

    .checkbox:checked + label::before,
    .checkbox:not(:checked) + label::before {
        content: '\f00c';
        font-family: FontAwesome;
        color: #6189A5;
        display: inline-block;
        width: 17px;
        height: 17px;
        line-height: 17px;
        text-align: center;
        position: relative;
        top: 0;
        background: #6189A5;
        margin-right: 1em;
        border: 1px solid #283144;
    }

    .checkbox:hover + label::before {
        color: rgba(255, 255, 255, .2);
        background: rgba(40, 49, 68, .2);
    }

    .checkbox:checked + label::before {
        color: #ffffff;
        background: #283144;
    }

    .form__label {
        font-size: 0.8em;
        line-height: 2em;
        color: #223143;
        font-weight: bold;
        display: block;
        margin-bottom: .5em;
    }

    .form__label--small {
        width: 40%;
        float: left;
    }

    .form__button {
        display: inline-block;
        width: auto;
        float: right;
        cursor: pointer;
        text-transform: uppercase;
        background: #E15130;
    }

    .link {
        color: #283144;
        font-size: 0.8em;
        text-decoration: none;
    }

    .select__icon::after {
        font-family: FontAwesome;
        font-style: normal;
        font-weight: normal;
        content: '\F0D7';
        display: block;
        width: 1.9em;
        height: 1.9em;
        position: absolute;
        top: 0;
        right: 0;
        pointer-events: none;
        color: #fff;
        text-align: center;
        line-height: 1.9em;
    }

    @media (min-width: 769px) {

        #openMenu {
            display: none;
        }

        .menu--closed {
            transform: translate(0, 0);
        }

        .menu {
            position: relative;
            width: auto;
        }

        .menu__header {
            padding: 1em;
            font-size: .9em;
        }

        .section__header {
            margin: 0 0 .5em 0;
            font-size: .9em;
        }

        .menu__section {
            padding: .75em 1em;
        }

        .form__row {
            margin-bottom: .5em;
        }
    }

</style>
