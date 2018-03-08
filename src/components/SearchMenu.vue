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
                    <i class="fas fa-angle-down"></i>
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
                <div class="form__input form__input--small form__input--inactive">{{ stats.cost }}</div>
            </div>
            <div class="form__row">
                <span class="form__label form__label--small">Path Nodes</span>
                <div class="form__input form__input--small form__input--inactive">{{ stats.nodes }}</div>
            </div>
            <div class="form__row">
                <span class="form__label form__label--small">Explored</span>
                <div class="form__input form__input--small form__input--inactive">{{ stats.explored }}</div>
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
            <a href="https://github.com/marcbreitung/problem-search-explorer" class="link" target="_blank">
                <i class="fab fa-github"></i> Problem Search Explorer
            </a>
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
        background: #313740;
        width: 25px;
        text-align: center;
        color: #fff;
        height: 25px;
        line-height: 25px;
        position: absolute;
        top: -25px;
    }

    .menu {
        background: #313740;
        min-width: 255px;
        position: absolute;
        width: 100%;
        transition: all .25s ease-in-out;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.15);
    }

    .menu--closed {
        transform: translate(0, 100%);
    }

    .menu__section {
        padding: .5em;
        border-bottom: 1px solid #656A73;
    }

    .menu__header {
        font-size: .7em;
        margin: 0;
        padding: .5em;
        color: #D9CFC7;
        text-transform: uppercase;
        font-weight: bold;
        border-bottom: 1px solid #656A73;
    }

    .section__header {
        font-size: .8em;
        margin: 0;
        padding: 0;
        color: #D9CFC7;
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
        padding: .5em;
        background: #656A73;
        color: #fff;
        overflow: hidden;
    }

    .form__input--small {
        width: 50%;
        float: right;
    }

    .form__input--inactive {
        background: none;
        border: 1px solid rgba(101, 106, 115, 0.25);
        color: #D9CFC7;
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
        content: ' ';
        color: #656A73;
        display: inline-block;
        width: 10px;
        height: 10px;
        text-align: center;
        position: relative;
        top: 3px;
        background: #656A73;
        margin-right: 1em;
        border: 3px solid #656A73;
    }

    .checkbox:checked + label::before {
        background: #ffffff;
    }

    .form__label {
        font-size: 0.7em;
        line-height: 2em;
        color: #D9CFC7;
        font-weight: normal;
        display: block;
        margin-bottom: .5em;
    }

    .form__label--small {
        width: 40%;
        float: left;
    }

    .form__button {
        display: inline-block;
        float: right;
        cursor: pointer;
        background: #E15130;
        font-size: 0.7em;
        padding: 6px 29px;
        width: 50%;
    }

    .link {
        color: #D9CFC7;
        font-size: 0.7em;
        text-decoration: none;
    }

    .select__icon  svg {
        display: block;
        width: 1em;
        height: 1em;
        position: absolute;
        top: 6px;
        right: 5px;
        pointer-events: none;
        color: #D9CFC7;
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
            margin: 10px;
            overflow: auto;
        }

        .menu__header {
            padding: 1em;
        }

        .section__header {
            margin: 0 0 .5em 0;
        }

        .menu__section {
            padding: .75em 1em;
        }

        .form__row {
            margin-bottom: .5em;
        }
    }

</style>
