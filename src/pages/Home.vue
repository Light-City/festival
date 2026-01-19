<template>
  <div class="home">
    <div class="hero-section">
      <div class="container">
        <h1>AI春晚 - 人工智能与春节的完美结合</h1>
        <p class="subtitle">探索AI技术如何为传统春节注入新的活力与创意</p>
        <div class="hero-actions">
          <button class="btn primary" @click="goToProgramList">立即参与</button>
          <button class="btn secondary" @click="goToAbout">了解更多</button>
        </div>
      </div>
    </div>
    
    <div class="features-section">
      <div class="container">
        <h2>AI春晚特色功能</h2>
        <div class="features-grid">
          <div class="feature-card">
            <h3>🎫 AI入场券</h3>
            <p>专属AI名片，展示您的AI创作成果</p>
            <router-link to="/ai-card" class="btn outline">领取入场券</router-link>
          </div>
          <div class="feature-card">
            <h3>🤝 共创者社区</h3>
            <p>与AI创作者交流合作，共同成长</p>
            <router-link to="/co-creator" class="btn outline">加入社区</router-link>
          </div>
          <div class="feature-card">
            <h3>🎬 节目展映</h3>
            <p>欣赏精彩的AI艺术作品展示</p>
            <router-link to="/program-showcase" class="btn outline">观看作品</router-link>
          </div>
          <div class="feature-card">
            <h3>💼 撮合交易</h3>
            <p>AI创作需求与创作者的精准匹配</p>
            <router-link to="/matchmaking" class="btn outline">发布需求</router-link>
          </div>
        </div>
      </div>
    </div>
    
    <div class="countdown-section">
      <div class="container">
        <h2>距离AI春晚开幕还有</h2>
        <div class="countdown">
          <div class="countdown-item">
            <span class="number">{{ days }}</span>
            <span class="label">天</span>
          </div>
          <div class="countdown-item">
            <span class="number">{{ hours }}</span>
            <span class="label">时</span>
          </div>
          <div class="countdown-item">
            <span class="number">{{ minutes }}</span>
            <span class="label">分</span>
          </div>
          <div class="countdown-item">
            <span class="number">{{ seconds }}</span>
            <span class="label">秒</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'Home',
  components: {
    RouterLink
  },
  data() {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      countdownInterval: null
    }
  },
  mounted() {
    this.startCountdown()
  },
  beforeUnmount() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval)
    }
  },
  methods: {
    startCountdown() {
      const targetDate = new Date('2024-02-09T20:00:00').getTime()
      
      this.countdownInterval = setInterval(() => {
        const now = new Date().getTime()
        const distance = targetDate - now
        
        if (distance < 0) {
          this.days = '00'
          this.hours = '00'
          this.minutes = '00'
          this.seconds = '00'
          clearInterval(this.countdownInterval)
          return
        }
        
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0')
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0')
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0')
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0')
      }, 1000)
    },
    goToProgramList() {
      this.$router.push('/program-list')
    },
    goToAbout() {
      this.$router.push('/about')
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero-section {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px;
  margin-bottom: 3rem;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s;
}

.btn.primary {
  background: white;
  color: #667eea;
}

.btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn:hover {
  transform: translateY(-3px);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: #667eea;
  margin-bottom: 1rem;
}

.countdown-section {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.countdown-section h2 {
  margin-bottom: 2rem;
  color: #333;
}

.countdown {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.number {
  font-size: 3rem;
  font-weight: bold;
  color: #667eea;
}

.label {
  font-size: 1rem;
  color: #666;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .countdown {
    flex-wrap: wrap;
  }
  
  .number {
    font-size: 2rem;
  }
}
</style>