<template>
  <div class="program-showcase">
    <div class="container">
      <div class="page-header">
        <h1>节目展映</h1>
        <p>欣赏来自全球AI创作者的精美作品，感受AI艺术的魅力</p>
      </div>
      
      <div class="showcase-grid">
        <div 
          v-for="showcase in showcases" 
          :key="showcase.id" 
          class="showcase-item"
          @click="openShowcase(showcase.id)"
        >
          <div class="showcase-image">
            <div class="image-placeholder">
              <span>{{ showcase.title }}</span>
            </div>
            <div class="showcase-overlay">
              <span class="play-icon">▶️</span>
            </div>
          </div>
          <div class="showcase-info">
            <h3>{{ showcase.title }}</h3>
            <p class="creator">创作者：{{ showcase.creator }}</p>
            <p class="description">{{ showcase.description }}</p>
            <div class="showcase-stats">
              <span class="views">👁️ {{ showcase.views }} 观看</span>
              <span class="likes">❤️ {{ showcase.likes }} 点赞</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="collection-section">
        <h2>作品集系列</h2>
        <div class="collections">
          <div 
            v-for="collection in collections" 
            :key="collection.id" 
            class="collection-item"
          >
            <h3>{{ collection.name }}</h3>
            <p>{{ collection.description }}</p>
            <div class="collection-works">
              <span v-for="work in collection.works" :key="work" class="work-tag">
                {{ work }}
              </span>
            </div>
            <button class="btn primary" @click="viewCollection(collection.id)">
              查看系列
            </button>
          </div>
        </div>
      </div>
      
      <div class="reference-section">
        <h3>参考案例</h3>
        <p>参考"央视网 AI频道"- "共尔AI艺术节"的优秀展映模式</p>
        <div class="reference-features">
          <div class="feature">
            <h4>🎬 专业展映</h4>
            <p>按照专业标准进行作品筛选和展示</p>
          </div>
          <div class="feature">
            <h4>🌟 精品推荐</h4>
            <p>精选优秀作品进行重点推荐</p>
          </div>
          <div class="feature">
            <h4>📚 系列化展示</h4>
            <p>将相关作品组织成系列进行展示</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgramShowcase',
  data() {
    return {
      showcases: [
        {
          id: 1,
          title: 'AI春节动画：龙年大吉',
          creator: 'AI动画工作室',
          description: '使用AI技术创作的春节主题动画，展现传统与现代的完美结合',
          views: 12500,
          likes: 890
        },
        {
          id: 2,
          title: '智能春联生成器',
          creator: '创意科技团队',
          description: '基于深度学习的春联创作系统，一键生成富有创意的春联',
          views: 8900,
          likes: 567
        },
        {
          id: 3,
          title: 'AI年画艺术展',
          creator: '数字艺术协会',
          description: '传统年画与AI技术的创新融合，展现全新的视觉体验',
          views: 15600,
          likes: 1023
        },
        {
          id: 4,
          title: '智能春节音乐',
          creator: '音乐AI实验室',
          description: 'AI生成的春节主题音乐，融合传统乐器与现代电子音效',
          views: 7800,
          likes: 456
        }
      ],
      collections: [
        {
          id: 1,
          name: 'AI春节视觉艺术',
          description: '包含AI绘画、动画、设计等视觉艺术作品',
          works: ['春节动画', 'AI绘画', '视觉设计', '数字艺术']
        },
        {
          id: 2,
          name: '智能春节文化',
          description: 'AI技术与传统文化结合的创新作品',
          works: ['智能春联', 'AI诗词', '文化传承', '创新表达']
        },
        {
          id: 3,
          name: '春节科技体验',
          description: '利用AI技术创造的互动体验作品',
          works: ['互动游戏', 'VR体验', '智能装置', '科技艺术']
        }
      ]
    }
  },
  methods: {
    openShowcase(showcaseId) {
      alert(`打开作品详情：${showcaseId}`)
    },
    viewCollection(collectionId) {
      alert(`查看作品系列：${collectionId}`)
    }
  }
}
</script>

<style scoped>
.program-showcase {
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.showcase-item {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
}

.showcase-item:hover {
  transform: translateY(-5px);
}

.showcase-image {
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.image-placeholder {
  text-align: center;
}

.showcase-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.showcase-item:hover .showcase-overlay {
  opacity: 1;
}

.play-icon {
  font-size: 3rem;
}

.showcase-info {
  padding: 1.5rem;
}

.showcase-info h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.creator {
  color: #667eea;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.description {
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.showcase-stats {
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.9rem;
}

.collection-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  margin-bottom: 3rem;
}

.collection-section h2 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.collections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.collection-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.collection-item h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.collection-item p {
  color: #666;
  margin-bottom: 1rem;
}

.collection-works {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.work-tag {
  background: #667eea;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

.reference-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
}

.reference-section h3 {
  color: #333;
  margin-bottom: 1rem;
}

.reference-section p {
  color: #666;
  margin-bottom: 2rem;
}

.reference-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.feature {
  text-align: center;
  padding: 1rem;
}

.feature h4 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

.feature p {
  color: #666;
}

@media (max-width: 768px) {
  .showcase-grid {
    grid-template-columns: 1fr;
  }
  
  .collections {
    grid-template-columns: 1fr;
  }
  
  .reference-features {
    grid-template-columns: 1fr;
  }
}
</style>