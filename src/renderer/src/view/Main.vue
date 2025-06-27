<template>
    <el-container>
        <!-- 侧边栏 -->
        <el-aside width="150px">
        <el-menu :default-active="activeIndex"
                    class="menu-container"
                    background-color="Transparent"
                    @select="handleSelect">
            <el-menu-item index="1">
            <template #default>
                <el-icon>
                <ChromeFilled />
                </el-icon>
                <span style="font-weight: bold">环境管理</span>
            </template>
            </el-menu-item>
            <el-menu-item index="2">
            <template #default>
                <el-icon>
                <SwitchFilled />
                </el-icon>
                <span style="font-weight: bold">代理管理</span>
            </template>
            </el-menu-item>
            <el-menu-item index="3">
            <template #default>
                <el-icon>
                <Platform />
                </el-icon>
                <span style="font-weight: bold">窗口同步</span>
            </template>
            </el-menu-item>
            <el-menu-item index="4">
            <template #default>
                <el-icon>
                <Tools />
                </el-icon>
                <span style="font-weight: bold">系统设置</span>
            </template>
            </el-menu-item>
            <!-- <el-menu-item index="5">
            <template #default>
                <el-icon>
                <QuestionFilled />
                </el-icon>
                <span style="font-weight: bold">关于软件</span>
            </template>
            </el-menu-item> -->
            <el-menu-item index="logout">
            <template #default>
                <el-icon>
                <Right /> <!-- 使用正确的图标组件 -->
                </el-icon>
                <span style="font-weight: bold">退出登录</span>
            </template>
            </el-menu-item>
        </el-menu>
        <div class="fixed-div">
            <p>
            <el-text>
                当前网络环境
                <el-icon @click="getNet" :class="{ 'rotate-icon': isRotating }">
                <Refresh />
                </el-icon>
            </el-text>
            </p>
            <el-space direction="vertical" alignment="stretch">
            <el-text size="small" type="info" line-clamp="1">地区 {{ netInfo.country ?? "-" }}</el-text>
            <el-text size="small" type="info" line-clamp="1">位置 {{ netInfo.city ?? "-" }}</el-text>
            <el-text size="small" type="info" line-clamp="1">网络 {{ netInfo.query ?? "-" }}</el-text>
            </el-space>
        </div>
        </el-aside>
        <!-- 主体内容区域 -->
        <el-container>

        <el-main style="padding: 0 10px 0 0">

            <div id="mybgdiy" class="vanta-background"></div>
            <!-- 这里根据路由显示不同的页面内容 -->
            <router-view v-slot="{ Component, route }">
            <!--页面缓存-->
            <KeepAlive v-if="route.meta.keepAlive">
                <component :is="Component" :key="route.name" />
            </KeepAlive>
            <component :is="Component" v-else :key="route.name" />
            </router-view>
        </el-main>
        </el-container>
    </el-container>
</template>
<script setup>
import { RouterView, useRouter } from "vue-router";
import { useLoginStore } from '@/store/login';

const router = useRouter();
const activeIndex = ref("1");
import { ref, onMounted, onBeforeUnmount } from "vue";
import { AestheticFluidBg } from "@/utils/AestheticFluidBg.module.js";
import axios from "axios";


const netInfo = ref({});
const isRotating = ref(false)

// let colorbg = new AestheticFluidBg({//   dom: "box",//   colors: ["#ebebff","#ffcba8","#B0FDC3","#faffff","#e6e6e6","#adbeff"],//   loop: true// })

const getNet = () => {
  isRotating.value = true
  netInfo.value = {};
  axios.get("http://ip-api.com/json").then(res => {
    console.log("获取本电脑网络信息", res.data);
    netInfo.value = res.data;
    isRotating.value = false
  }).catch(() => {
    isRotating.value = false
  });
};

onMounted(() => {
  getNet();
  let colorbg = new AestheticFluidBg({
    dom: "mybgdiy",
    colors: ["#f5f8ff", "#f5f8ff", "#b8d7ff", "#66bdff", "#d6e5fd", "#d3e4ff"],
    loop: true
  });
  router.push('/windowList');
});

//路由切换
const handleSelect = (index, indexPath) => {
  const loginStore = useLoginStore();
  switch (index) {
    case "1":
      router.push("/windowList");
      break;
    case "2":
      router.push("/proxy");
      break;
    case "3":
      router.push("/sync");
      break;
    case "4":
      router.push("/settings");
      break;
    case "5":
      router.push("/about");
      break;
    case "logout":
      loginStore.clearToken();
      router.push('/login');
      break;
    default:
      break;
  }
};


</script>

<style scoped>
.menu-container {
  border: none;
}

.fixed-div {
  position: fixed; /* 固定定位 */
  left: 0; /* 距离左侧 0px */
  bottom: 0; /* 距离底部 0px */
  z-index: 9999; /* 确保元素在最上层（可选） */
  padding: 30px; /* 添加边距避免紧贴边缘（可选） */

  max-width: 120px;


}

.vanta-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* 确保背景在底层 */
}

.rotate-icon {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
