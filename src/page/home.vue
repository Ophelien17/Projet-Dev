<template>
    <div class="homepage">
        <div class="header">
            <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg" alt="">
            <div class="wrapper--input">
                <input v-model="userSearch" type="text" placeholder="De quoi avez vous envie ?">
                <div class="search">
                    <router-link v-for="(restaurant,i) in searchRestaurant" :key="i"
                        :to="{name: 'Restaurant',params: {name: restaurant.name} }">
                        <div class="container--restaurant--search">
                            <div class="wrapper--img">
                                <img :src="restaurant.image" alt="">
                            </div>
                            <p>{{restaurant.name}}</p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="wrapper--user">
                <router-link to="/PostList">Username</router-link>
            </div>
        </div>
        <div class="bannier"></div>
        <RestaurantRow v-for="(data, i) in data_restaurant" :key="i" :three_restaurant="data" />
    </div>
</template>

<script>
    import BDD from '../BDD'
    import {
        onMounted,
        ref,
        watch
    } from 'vue'
    //comp
    import RestaurantRow from '../components/RestaurantRow.vue'
    export default {
        name: 'HomePage',
        components: {
            RestaurantRow,
        },
        setup() {
            class Restaurant {
                constructor(name, note, image, drive_time) {
                    this.name = name
                    this.note = note
                    this.image = image
                    this.drive_time = drive_time

                }
            }

            let data_restaurant = ref([])
            let allRestaurant = [];
            const makeDataRestaurant = () => {
                let three_restaurant = [];
                for (const restaurant of BDD) {
                    const new_restaurant = new Restaurant(restaurant.name, restaurant.note, restaurant.image,
                        restaurant.drive_time)
                    allRestaurant.push(new_restaurant)
                    if (three_restaurant.length == 2) {
                        three_restaurant.push(new_restaurant);
                        data_restaurant.value.push(three_restaurant);
                        three_restaurant = [];
                    } else {
                        three_restaurant.push(new_restaurant);
                    }

                }
                console.log(data_restaurant)
            }
            let userSearch = ref('');
            let searchRestaurant = ref([])
            watch(userSearch, newValue => {
                let regex = RegExp(newValue.toLowerCase())

                let newSearchRestaurant = allRestaurant.filter(restaurant => regex.test(restaurant.name))

                newValue == 0 ? searchRestaurant.value = [] : searchRestaurant.value = newSearchRestaurant;
            })

            onMounted(makeDataRestaurant)

            return {
                data_restaurant,
                userSearch,
                searchRestaurant
            }
        }
    }
</script>

<style lang="scss">
    .homepage {
        .header {
            height: 120px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            img {
                width: 200px;
            }

            .wrapper--input {
                position: relative;

                input {

                    background-color: #f6f6f6;
                    border: none;
                    height: 60px;
                    width: 400px;
                    outline: none;
                    padding-left: 20px;
                }

                .search {
                    position: absolute;
                    top: 100%;
                    width: 100%;
                    background-color: #ffffff;

                    .container--restaurant--search {
                        display: flex;
                        align-items: center;
                        padding: 10px;

                        &:hover {
                            background: #f6f6f6;
                        }

                        .wrapper--img {
                            height: 60px;
                            width: 60px;
                            margin-right: 25px;
                            border-radius: 50%;
                            overflow: hidden;

                            img {
                                height: 60px;
                                width: auto;
                            }
                        }
                    }
                }
            }

            .wrapper--user {
                position: relative;
                background-color: #f6f6f6;
                border: none;
                height: 60px;
                width: 400px;
                outline: none;
                padding-left: 20px;
                align-items: center;
            }

        }

        .bannier {
            height: 200px;
            width: 100%;
            background-image: url('https://www.ubereats.com/restaurant/_static/7b308f7cbbf8e335ceda0447a8bd7c63.png');
            background-size: cover;
            background-position: center center;
        }
    }
</style>