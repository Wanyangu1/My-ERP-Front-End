<template>
  <div class="home">
    <header class="hero">
      <h1>Welcome to Our E-Learning Platform</h1>
      <p>Your gateway to online learning.</p>
      <router-link to="/courses" class="button">Explore Courses</router-link>
    </header>
    <section class="features">
      <h2>Why Choose Us?</h2>
      <ul>
        <li>High-Quality Courses</li>
        <li>Expert Instructors</li>
        <li>Flexible Learning</li>
        <li>Interactive Content</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

.hero {
  background-color: #f5f5f5;
  padding: 50px 20px;
  margin-bottom: 20px;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.features {
  margin: 20px 0;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>
