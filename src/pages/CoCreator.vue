<template>
  <div class="co-creator">
    <div class="container">
      <div class="page-header">
        <h1>共创者展示</h1>
        <p>与AI艺术家和创作者一起，共同打造精彩的AI春节内容</p>
      </div>
      
      <div class="search-section">
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索创作者或作品..."
            @input="searchCreators"
          >
          <button class="btn primary">搜索</button>
        </div>
        <div class="filter-options">
          <select v-model="selectedCategory">
            <option value="">全部分类</option>
            <option value="official">官方认证</option>
            <option value="artist">AI艺术家</option>
            <option value="developer">技术开发者</option>
            <option value="designer">设计师</option>
          </select>
          <select v-model="sortBy">
            <option value="hot">按热度</option>
            <option value="new">按最新</option>
            <option value="likes">按点赞数</option>
          </select>
        </div>
      </div>
      
      <div class="creators-grid">
        <div 
          v-for="creator in filteredCreators" 
          :key="creator.id" 
          class="creator-card"
        >
          <div class="creator-header">
            <img :src="creator.avatar" :alt="creator.name" class="avatar">
            <div class="creator-info">
              <h3>{{ creator.name }}</h3>
              <span class="badge official" v-if="creator.isOfficial">官方认证</span>
              <p class="specialty">{{ creator.specialty }}</p>
            </div>
          </div>
          
          <div class="video-preview">
            <div class="video-placeholder">
              <span>视频预览</span>
            </div>
            <div class="video-stats">
              <span class="likes">❤️ {{ creator.likes }}</span>
              <span class="views">👁️ {{ creator.views }}</span>
            </div>
          </div>
          
          <div class="creator-actions">
            <button class="btn like-btn" @click="likeCreator(creator.id)">
              ❤️ 点赞 ({{ creator.likes }})
            </button>
            <button class="btn contact-btn" @click="contactCreator(creator.id)">
              💌 联系创作者
            </button>
          </div>
        </div>
      </div>
      
      <div class="upload-section">
        <h3>成为共创者</h3>
        <p>上传您的AI作品，加入我们的共创者社区</p>
        <div class="upload-actions">
          <button class="btn primary" @click="showUploadModal">上传作品</button>
          <button class="btn secondary" @click="applyCreator">申请共创者勋章</button>
        </div>
      </div>
      
      <div v-if="showUpload" class="modal">
        <div class="modal-content">
          <h3>上传作品</h3>
          <form @submit.prevent="submitVideo">
            <div class="form-group">
              <label>作品标题</label>
              <input type="text" v-model="uploadData.title" required>
            </div>
            <div class="form-group">
              <label>作品描述</label>
              <textarea v-model="uploadData.description" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>上传视频</label>
              <input type="file" accept="video/*" @change="handleFileUpload">
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn primary">提交审核</button>
              <button type="button" class="btn secondary" @click="showUpload = false">取消</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoCreator',
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'hot',
      showUpload: false,
      uploadData: {
        title: '',
        description: '',
        file: null
      },
      creators: [
        {
          id: 1,
          name: 'AI艺术家小明',
          avatar: '/avatar1.jpg',
          specialty: 'AI绘画与动画',
          isOfficial: true,
          likes: 1245,
          views: 8900,
          category: 'official'
        },
        {
          id: 2,
          name: '创意设计师小红',
          avatar: '/avatar2.jpg',
          specialty: '视觉设计与品牌',
          isOfficial: false,
          likes: 890,
          views: 5600,
          category: 'designer'
        },
        {
          id: 3,
          name: '技术开发者小李',
          avatar: '/avatar3.jpg',
          specialty: 'AI算法与实现',
          isOfficial: true,
          likes: 1567,
          views: 12000,
          category: 'developer'
        }
      ]
    }
  },
  computed: {
    filteredCreators() {
      let filtered = this.creators
      
      if (this.searchQuery) {
        filtered = filtered.filter(creator => 
          creator.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          creator.specialty.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }
      
      if (this.selectedCategory) {
        filtered = filtered.filter(creator => creator.category === this.selectedCategory)
      }
      
      // 排序逻辑
      if (this.sortBy === 'hot') {
        filtered.sort((a, b) => b.likes - a.likes)
      } else if (this.sortBy === 'new') {
        filtered.sort((a, b) => b.id - a.id)
      } else if (this.sortBy === 'likes') {
        filtered.sort((a, b) => b.likes - a.likes)
      }
      
      return filtered
    }
  },
  methods: {
    searchCreators() {
      // 搜索逻辑已在计算属性中处理
    },
    likeCreator(creatorId) {
      const creator = this.creators.find(c => c.id === creatorId)
      if (creator) {
        creator.likes++
      }
    },
    contactCreator(creatorId) {
      alert('站内信功能即将开启，您将可以联系创作者')
    },
    showUploadModal() {
      this.showUpload = true
    },
    applyCreator() {
      alert('共创者勋章申请功能即将开启')
    },
    handleFileUpload(event) {
      this.uploadData.file = event.target.files[0]
    },
    submitVideo() {
      if (!this.uploadData.title || !this.uploadData.file) {
        alert('请填写完整信息并上传文件')
        return
      }
      alert('作品已提交，等待审核中...')
      this.showUpload = false
      this.uploadData = { title: '', description: '', file: null }
    }
  }
}
</script>

<style scoped>
.co-creator {
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.search-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-bar input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.filter-options {
  display: flex;
  gap: 1rem;
}

.filter-options select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.creators-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.creator-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  overflow: hidden;
}

.creator-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #ddd;
  margin-right: 1rem;
}

.creator-info h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.badge.official {
  background: #ff6b6b;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

.specialty {
  color: #666;
  margin: 0;
}

.video-preview {
  position: relative;
  height: 200px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-placeholder {
  text-align: center;
  color: #666;
}

.video-stats {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
}

.creator-actions {
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
}

.like-btn, .contact-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.like-btn {
  background: #ffeaea;
  color: #ff6b6b;
}

.contact-btn {
  background: #667eea;
  color: white;
}

.upload-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
}

.upload-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
  }
  
  .filter-options {
    flex-direction: column;
  }
  
  .creators-grid {
    grid-template-columns: 1fr;
  }
  
  .upload-actions {
    flex-direction: column;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}
</style>