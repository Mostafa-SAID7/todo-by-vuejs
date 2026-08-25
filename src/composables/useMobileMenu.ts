/**
 * useMobileMenu Composable
 * Manages mobile sidebar visibility and responsive behavior
 */

import { ref, computed } from 'vue'

export function useMobileMenu() {
  const isSidebarOpen = ref<boolean>(false)
  const isMobile = ref<boolean>(window.innerWidth < 768)

  /**
   * Toggle sidebar open/closed
   */
  const toggleSidebar = (): void => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  /**
   * Close sidebar
   */
  const closeSidebar = (): void => {
    isSidebarOpen.value = false
  }

  /**
   * Open sidebar
   */
  const openSidebar = (): void => {
    isSidebarOpen.value = true
  }

  /**
   * Update mobile state based on window size
   */
  const updateMobileState = (): void => {
    isMobile.value = window.innerWidth < 768
    // Close sidebar on desktop
    if (!isMobile.value) {
      isSidebarOpen.value = false
    }
  }

  /**
   * Initialize window resize listener
   */
  const initializeResizeListener = (): void => {
    window.addEventListener('resize', updateMobileState)
  }

  /**
   * Remove resize listener
   */
  const removeResizeListener = (): void => {
    window.removeEventListener('resize', updateMobileState)
  }

  /**
   * Computed property for sidebar visibility
   */
  const showSidebar = computed(() => {
    // On desktop, always show sidebar
    // On mobile, show only if opened
    return !isMobile.value || isSidebarOpen.value
  })

  return {
    isSidebarOpen,
    isMobile,
    showSidebar,
    toggleSidebar,
    closeSidebar,
    openSidebar,
    updateMobileState,
    initializeResizeListener,
    removeResizeListener,
  }
}
