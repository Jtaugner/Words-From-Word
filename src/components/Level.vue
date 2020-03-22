<template>
    <div class="level"
         @click="getLevel(level)" :class="stars[getLevelByLevelAndLocation(level)-1] > 0 ? 'level-done' : ''">
        <div v-show="getLevelByLevelAndLocation(level) === 1 || stars[getLevelByLevelAndLocation(level)-2] > 0">{{getLevelByLevelAndLocation(level)}}</div>
        <div class="menu__level_stars">
            <div class="level_star" v-for="star in 3" :key="star"
                 :class="star <= stars[getLevelByLevelAndLocation(level)-1] ? 'menu-star' : ''"></div>

        </div>
        <div class="close-level" v-show="level !== 1 && stars[level-2] === 0"></div>
    </div>
</template>

<script>

    export default {
        name: 'Levels',
        props: ['level', 'stars']
    }
</script>

<style>

</style>
