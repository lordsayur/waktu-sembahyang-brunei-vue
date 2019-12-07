<template>
    <div class="count-down">
        <p><span :class="{'active': isActive}">{{ time }}</span> minit lagi kn masuk waktu <span :class="{'active': isActive}">{{ prayer }}</span></p>
    </div>
</template>

<script>
export default {
    name: "CountDown",
    props: {
        time: {
            type: Number,
            required: true,
            default: 123
        },
        prayer: {
            type: String,
            required: true,
            default: "Maghrib"
        },
        activeStart: {
            type: Number,
            default: 15
        }
    },

    computed:{
        isActive(){
            return this.$props.time < this.$props.activeStart;
        }
    }
}
</script>

<style lang="scss" scoped>
    .count-down{
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
        margin: 1rem 5vw;

        p {
            margin: .5rem .2rem;
            color: gray;
            font-size: 1.2rem;
        }
    }
    span.active {
        color: #FFEB3B;
    }
</style>