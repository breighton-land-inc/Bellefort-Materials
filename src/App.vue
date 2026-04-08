<script setup>
import { ref } from 'vue'
import { useMaterials } from './materials.js'

const { 
  categories, 
  isModalOpen, 
  selectedFile, 
  openPreview, 
  closePreview, 
  downloadFile,
  baseUrl
} = useMaterials()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const scrollToCategory = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    isMenuOpen.value = false;
  }
}

const isAndroid = () => {
  return /Android/i.test(navigator.userAgent);
}
</script>

<template>
  <div class="portal-wrapper">
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <img :src="`${baseUrl}/Bellefort_Logo (1).png`" alt="Bellefort Estates" class="nav-logo" />
        </div>

        <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
          <span :class="['bar', { 'top-active': isMenuOpen }]"></span>
          <span :class="['bar', { 'mid-active': isMenuOpen }]"></span>
          <span :class="['bar', { 'bot-active': isMenuOpen }]"></span>
        </button>

        <div :class="['nav-links', { 'links-visible': isMenuOpen }]">
          <a href="#" @click.prevent="scrollToCategory('home')">Home</a>
          <a v-for="cat in categories" :key="cat.title" href="#" @click.prevent="scrollToCategory(cat.title)">
            {{ cat.title }}
          </a>
        </div>
      </div>
    </nav>

    <header id="home" class="hero">
      <div class="video-banner-container">
        <video autoplay muted loop playsinline class="hero-video">
          <source :src="`${baseUrl}/Bellefort Estate Logo Animated.mp4`" type="video/mp4">
          <source :src="`${baseUrl}/Bellefort Estate Logo Animated.mp4`" type="video/quicktime">
          Your browser does not support the video tag.
        </video>
        
        <div class="hero-overlay">
          <div class="hero-content">
            <h1 class="hero-title">Broker & Seller Materials</h1>
            <p class="hero-subtitle">Access the latest official marketing assets and technical documents.</p>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <section v-for="category in categories" :id="category.title" :key="category.title" class="category-section">
        <h2 class="category-header">
          <span>{{ category.title }}</span>
        </h2>
        
        <div class="grid">
          <div v-for="item in category.items" :key="item.name" class="material-card">
            <div class="card-top">
              <div class="file-badge" :class="item.type.toLowerCase()">
                {{ item.type }}
              </div>
              <span class="official-tag">OFFICIAL</span>
            </div>
            
            <div class="card-body">
              <h3>{{ item.name }}</h3>
              <div class="button-group">
                <button v-if="item.type !== 'Excel'" @click="openPreview(item)" class="btn-secondary">
                  Preview
                </button>
                <button @click="downloadFile(item.file, item.name)" class="btn-primary">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isModalOpen" class="modal-overlay" @click.self="closePreview">
          <div class="modal-window">
            <div class="modal-header">
              <h3>{{ selectedFile?.name }}</h3>
              <button class="close-btn" @click="closePreview">&times;</button>
            </div>
            
            <div class="modal-body">
              <video v-if="selectedFile?.type === 'Video'" controls autoplay class="preview-obj video-fix">
                <source :src="selectedFile.file" type="video/mp4">
              </video>

              <iframe 
                v-else-if="selectedFile?.type === 'PDF' && isAndroid() && selectedFile.file.startsWith('http')" 
                :src="`https://docs.google.com/gview?url=${encodeURIComponent(selectedFile.file)}&embedded=true`" 
                class="preview-obj"
                frameborder="0"
              ></iframe>

              <embed 
                v-else-if="selectedFile?.type === 'PDF'" 
                :src="selectedFile.file" 
                type="application/pdf"
                class="preview-obj"
              />

              <img 
                v-else-if="selectedFile?.type === 'Image'" 
                :src="selectedFile.file" 
                class="preview-obj video-fix" 
              />

              <div v-else class="no-preview">
                <p>No preview available for this file type.</p>
                <button @click="downloadFile(selectedFile.file, selectedFile.name)" class="btn-primary">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>