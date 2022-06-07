<template>
    <div>
        <button @click="GetPosts">Loads posts</button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'PostList',
        data() {
            return {
                posts: [],
            }
        },
        methods: {
            GetPosts() {
                axios.get('http://localhost:3000/api/fonction3/lud')
                    .then((response) => {
                        console.log(response.data)
                        this.posts = response.data
                    }).catch((error) => {
                        console.log(error)
                    })
            }
        },
    }
</script>

<style>

</style>