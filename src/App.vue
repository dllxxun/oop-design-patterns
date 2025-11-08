<template>
  <div style="padding:20px; font-family:sans-serif;">
    <h2>목욕탕 라커 시스템</h2>

    <div style="margin-top:16px;">
      <button @click="addLocker">라커 추가</button>
      <button @click="cloneLocker" :disabled="!selectedId">선택 라커 복제</button>
      <button @click="removeLocker" :disabled="!selectedId">선택 라커 삭제</button>
    </div>

    <h3 style="margin-top:16px;">라커 목록</h3>
    <ul>
      <li v-for="locker in lockersList" :key="locker.id" @click="selectLocker(locker.id)" :style="locker.id === selectedId ? 'font-weight:bold; cursor:pointer;' : 'cursor:pointer;'">
        {{ locker.name }} ({{ locker.locked ? '잠금' : '열림' }})
      </li>
    </ul>

    <div v-if="selectedLocker" style="margin-top:20px; padding:10px; border:1px solid #ccc; width:260px;">
      <h4>선택된 라커</h4>
      <p>ID: {{ selectedLocker.id }}</p>
      <p>상태: {{ selectedLocker.locked ? '잠겨있음' : '열려있음' }}</p>

      <textarea v-model="note" placeholder="메모 입력" style="width:100%; height:60px; margin-top:8px;"></textarea>

      <div style="margin-top:10px;">
        <button @click="lock">잠그기</button>
        <button @click="unlock">열기</button>
        <button @click="updateNote">메모 저장</button>
      </div>
    </div>

    <h3 style="margin-top:20px;">실행 결과</h3>
    <p>{{ message }}</p>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { Locker } from './prototype'
import { LockerFacade } from './facade'
import { LockCommand, UnlockCommand, UpdateNoteCommand, Invoker } from './command'

export default defineComponent({
  setup() {
    const lockers = reactive(new Map<string, Locker>())
    const selectedId = ref<string | null>(null)
    const note = ref('')
    const message = ref('')

    const facade = new LockerFacade(lockers)
    const invoker = new Invoker()

    const lockersList = computed(() => Array.from(lockers.values()))
    const selectedLocker = computed(() => selectedId.value ? lockers.get(selectedId.value) ?? null : null)

    function addLocker() {
      const id = Date.now().toString()
      lockers.set(id, new Locker(id, `Locker ${lockers.size + 1}`))
    }

    function cloneLocker() {
      if (!selectedLocker.value) return
      const id = Date.now().toString()
      lockers.set(id, selectedLocker.value.clone(id))
    }

    function removeLocker() {
      if (!selectedId.value) return
      lockers.delete(selectedId.value)
      selectedId.value = null
    }

    function selectLocker(id: string) {
      selectedId.value = id
      note.value = selectedLocker.value?.note ?? ''
    }

    function lock() {
      if (!selectedId.value) return
      message.value = invoker.run(new LockCommand(facade, selectedId.value))
    }

    function unlock() {
      if (!selectedId.value) return
      message.value = invoker.run(new UnlockCommand(facade, selectedId.value))
    }

    function updateNote() {
      if (!selectedId.value) return
      message.value = invoker.run(new UpdateNoteCommand(facade, selectedId.value, note.value))
    }

    return { lockersList, selectedId, selectedLocker, note, message, addLocker, cloneLocker, removeLocker, selectLocker, lock, unlock, updateNote }
  }
})
</script>

<style>
button { margin-right: 6px; }
li:hover { text-decoration: underline; }
</style>