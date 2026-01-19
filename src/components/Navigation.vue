<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">
        <router-link to="/">AI春晚</router-link>
      </div>
      <ul class="nav-menu">
        <li class="nav-item">
          <router-link to="/" class="nav-link">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/program-list" class="nav-link">节目单</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/ai-card" class="nav-link">AI入场券</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/co-creator" class="nav-link">共创者</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/program-showcase" class="nav-link">节目展映</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/matchmaking" class="nav-link">撮合交易</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/creator-support" class="nav-link">创作者支持</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin" class="nav-link">后台管理</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'Navigation',
  components: {
    RouterLink
  }
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.nav-logo a {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255,255,255,0.2);
}
</style>