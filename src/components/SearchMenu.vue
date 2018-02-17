<template>
    <div id="menu" class="menu">
        <h1 class="menu__header">Problem Search Explorer</h1>
        <div class="menu__section section">
            <h2 class="section__header">Search</h2>
            <label class="form__label">Search Strategy</label>
            <div class="form__row">
                <div class="select__icon">
                    <select v-model="searchStrategy" @change="onChangeStrategy()" class="form__input menu__select">
                        <option value="BreadthFirstSearch">Breadth First Search</option>
                        <option value="UniformCostSearch">Uniform Cost Search</option>
                        <option value="DepthFirstSearch">Depth First Search</option>
                        <option value="DepthLimitedSearch">Depth Limited Search</option>
                    </select>
                </div>
            </div>
            <div class="form__row" v-if="isLimit">
                <label class="form__label form__label--small">Depth Limit</label>
                <input type="number" class="form__input form__input--small" v-model="strategyOptions.limit" placeholder="Depth Limit"
                       step="1" min="1">
            </div>
            <div class="form__row">
                <button class="form__input form__button" v-on:click="doSearch">Search</button>
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
        isLimit: false
    }
    export default {
        name: 'SearchMenu',
        data: function () {
            return data
        },
        methods: {
            onChangeStrategy: function () {
                this.isLimit = this.searchStrategy === 'DepthLimitedSearch'
            },
            doSearch: function () {
                this.$emit('updateSearch', data)
            },
            onChangeMap: function () {
                this.$emit('updateMap', data)
            }
        }
    }
</script>

<style scoped>
    .menu {
        background: #6189A5;
        min-width: 250px;
    }

    .menu__section {
        padding: 1em;
        border-bottom: 1px solid #283144;
    }

    .menu__header {
        font-size: 1em;
        margin: 0;
        padding: 1em;
        color: #223143;
        text-transform: uppercase;
        font-weight: bold;
        border-bottom: 1px solid #283144;
    }

    .section__header {
        font-size: 1em;
        margin: 0 0 .75em 0;
        padding: 0;
        color: #223143;
        text-transform: uppercase;
        font-weight: bold;
    }

    .form__row {
        margin-bottom: .5em;
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
    }

    .form__input--small {
        width: 60%;
        float: right;
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
        width: 30%;
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
</style>
