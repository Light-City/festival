<template>
  <div class="matchmaking">
    <div class="container">
      <div class="page-header">
        <h1>撮合交易</h1>
        <p>连接需求者与创作者，实现AI项目的完美合作</p>
      </div>
      
      <div class="matchmaking-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
      
      <div v-if="activeTab === 'demand'" class="demand-section">
        <div class="demand-form">
          <h3>发布AI项目需求</h3>
          <form @submit.prevent="submitDemand">
            <div class="form-group">
              <label>项目类型 *</label>
              <select v-model="demandForm.type" required>
                <option value="">请选择项目类型</option>
                <option value="design">AI设计</option>
                <option value="development">AI开发</option>
                <option value="content">AI内容创作</option>
                <option value="consulting">AI咨询</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>项目标题 *</label>
              <input type="text" v-model="demandForm.title" required>
            </div>
            
            <div class="form-group">
              <label>详细需求描述 *</label>
              <textarea v-model="demandForm.description" rows="5" required></textarea>
            </div>
            
            <div class="form-group">
              <label>预算范围</label>
              <select v-model="demandForm.budget">
                <option value="">请选择预算</option>
                <option value="0-1000">1000元以下</option>
                <option value="1000-5001">1000-5001元</option>
                <option value="5001-10000">5001-10000元</option>
                <option value="10000+">10000元以上</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>截止时间</label>
              <input type="date" v-model="demandForm.deadline">
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn primary">发布需求</button>
            </div>
          </form>
        </div>
        
        <div class="demand-list">
          <h3>已发布的需求</h3>
          <div v-for="demand in demands" :key="demand.id" class="demand-item">
            <div class="demand-header">
              <h4>{{ demand.title }}</h4>
              <span class="status" :class="demand.status">{{ demand.statusText }}</span>
            </div>
            <p class="description">{{ demand.description }}</p>
            <div class="demand-meta">
              <span>预算：{{ demand.budget }}</span>
              <span>截止：{{ demand.deadline }}</span>
              <span>接单数：{{ demand.applications }}</span>
            </div>
            <div class="demand-actions">
              <button class="btn small" @click="viewApplications(demand.id)">查看接单</button>
              <button class="btn small secondary" @click="editDemand(demand.id)">编辑</button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="activeTab === 'supply'" class="supply-section">
        <div class="supply-requirements">
          <h3>成为接单创作者</h3>
          <p>需要平台发放共创者勋章才能接单</p>
          <div class="requirements">
            <div class="requirement">
              <h4>🎖️ 共创者勋章要求</h4>
              <ul>
                <li>完成实名认证</li>
                <li>提交至少3个作品通过审核</li>
                <li>社区活跃度达标</li>
                <li>无违规记录</li>
              </ul>
            </div>
            <div class="requirement">
              <h4>📋 接单流程</h4>
              <ol>
                <li>申请共创者勋章</li>
                <li>浏览需求项目</li>
                <li>提交接单申请</li>
                <li>等待需求方选择</li>
                <li>开始项目合作</li>
              </ol>
            </div>
          </div>
          <button class="btn primary" @click="applyBadge">申请共创者勋章</button>
        </div>
        
        <div class="available-demands">
          <h3>可接单的需求</h3>
          <div v-for="demand in availableDemands" :key="demand.id" class="demand-card">
            <div class="demand-info">
              <h4>{{ demand.title }}</h4>
              <p class="type">类型：{{ demand.type }}</p>
              <p class="description">{{ demand.description }}</p>
              <div class="demand-details">
                <span>预算：{{ demand.budget }}</span>
                <span>截止：{{ demand.deadline }}</span>
                <span>已申请：{{ demand.applications }}人</span>
              </div>
            </div>
            <div class="demand-actions">
              <button 
                class="btn primary" 
                :disabled="!hasBadge"
                @click="applyDemand(demand.id)"
              >
                {{ hasBadge ? '申请接单' : '需要勋章' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="activeTab === 'manage'" class="manage-section">
        <h3>撮合管理（管理员功能）</h3>
        <div class="admin-features">
          <div class="feature-card">
            <h4>需求审核</h4>
            <p>审核用户发布的需求，确保内容合规</p>
            <button class="btn primary">进入审核</button>
          </div>
          <div class="feature-card">
            <h4>交易监督</h4>
            <p>监督项目合作过程，处理纠纷</p>
            <button class="btn primary">监督管理</button>
          </div>
          <div class="feature-card">
            <h4>勋章管理</h4>
            <p>发放和管理共创者勋章</p>
            <button class="btn primary">勋章管理</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Matchmaking',
  data() {
    return {
      activeTab: 'demand',
      tabs: [
        { id: 'demand', label: '发布需求' },
        { id: 'supply', label: '接单创作' },
        { id: 'manage', label: '撮合管理' }
      ],
      demandForm: {
        type: '',
        title: '',
        description: '',
        budget: '',
        deadline: ''
      },
      demands: [
        {
          id: 1,
          title: '需要AI春节海报设计',
          description: '为春节活动设计一套AI生成的海报，要求有春节元素和现代感',
          budget: '1000-5001元',
          deadline: '2024-01-20',
          status: 'pending',
          statusText: '待接单',
          applications: 3
        }
      ],
      availableDemands: [
        {
          id: 2,
          title: 'AI春节动画制作',
          type: 'AI设计',
          description: '制作30秒的春节主题AI动画，用于社交媒体宣传',
          budget: '5001-10000元',
          deadline: '2024-01-25',
          applications: 5
        }
      ],
      hasBadge: false
    }
  },
  methods: {
    submitDemand() {
      if (!this.demandForm.type || !this.demandForm.title || !this.demandForm.description) {
        alert('请填写完整信息')
        return
      }
      
      const newDemand = {
        id: Date.now(),
        ...this.demandForm,
        status: 'pending',
        statusText: '待接单',
        applications: 0
      }
      
      this.demands.unshift(newDemand)
      this.demandForm = { type: '', title: '', description: '', budget: '', deadline: '' }
      alert('需求发布成功！等待创作者接单')
    },
    viewApplications(demandId) {
      alert(`查看需求 ${demandId} 的接单申请`)
    },
    editDemand(demandId) {
      alert(`编辑需求 ${demandId}`)
    },
    applyBadge() {
      alert('共创者勋章申请功能即将开启')
    },
    applyDemand(demandId) {
      if (!this.hasBadge) {
        alert('请先申请共创者勋章')
        return
      }
      alert(`申请接单需求 ${demandId}`)
    }
  }
}
</script>

<style scoped>
.matchmaking {
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.matchmaking-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  border-bottom: 1px solid #eee;
}

.tab-btn {
  padding: 1rem 2rem;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
}

.tab-btn.active {
  border-bottom-color: #667eea;
  color: #667eea;
  font-weight: bold;
}

.demand-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.demand-form, .supply-requirements {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.demand-list, .available-demands {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.demand-item, .demand-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.demand-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.status {
  padding: 0.3rem 0.8rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

.status.pending {
  background: #ffeaa7;
  color: #856404;
}

.demand-meta, .demand-details {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
  margin: 1rem 0;
}

.demand-actions {
  display: flex;
  gap: 0.5rem;
}

.btn.small {
  padding: 0.3rem 0.8rem;
  font-size: 0.9rem;
}

.supply-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.requirements {
  display: grid;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.requirement {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 5px;
}

.requirement h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.requirement ul, .requirement ol {
  margin: 0;
  padding-left: 1.5rem;
}

.requirement li {
  color: #666;
  margin-bottom: 0.3rem;
}

.manage-section {
  text-align: center;
}

.admin-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.feature-card h4 {
  color: #333;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .demand-section, .supply-section {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .matchmaking-tabs {
    flex-direction: column;
  }
  
  .demand-meta, .demand-details {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .admin-features {
    grid-template-columns: 1fr;
  }
}
</style>