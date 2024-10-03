<template>
    <pre>{{ count }}</pre>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      count: null,
      error: null
    };
},
mounted () {
  this.getBookCountAPI();
},
    
methods: {
    async getBookCountAPI(){
        try {
        const response = await axios.get('https://countbook-egxodbttmq-uc.a.run.app');
        this.count = response.data;
        this.error = null;
        }catch(error){
        console.error('Error fetching book count:', error);
        this.error = error;
        this.count = null;
        }
    },
},
};
</script>

<style scoped>
.center-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
}

input, select {
    padding: 10px;
    width: 200px;
    margin-bottom: 10px;
}

button {
    padding: 10px 20px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin: 10px 0;
}

button {
    margin-left: 10px;
}
</style>
