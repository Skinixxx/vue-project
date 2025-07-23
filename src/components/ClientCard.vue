
<template>
    <v-card
        
        class = "client card"
        title="Card title" 
        variant="elevated"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
        
    >
        <v-card-item class="card-header">
            <div class="header-content">
                <v-card-title class="text-h6">
                    {{ props.cardItem.name }}
                </v-card-title>
            </div>
            <v-chip
                label
                class="status-chip"
            >
                <v-icon
                start
                :icon="statusIcon"
                >
                    {{ props.cardItem.status }}
                </v-icon>

            </v-chip>
        </v-card-item>
        <v-card-text>
            
            
        </v-card-text>
    </v-card>
    
</template>

<script setup lang="ts">
    import { Client } from '@/types/Client';
import { Status } from '@/utils/enum';
import { SassColor } from 'sass';
import { computed, ref } from 'vue';
    const isHovered = ref(false);

    

    //// 
    //// for check html
    ////
    const dateBuf = new Date(2025,6,20,17,47,0);
    const CardItem :Client={
        id:-1,
        name:'',
        status:Status.Active,
        lastUpdate:dateBuf
    };
    ////
    ////
    ////

    // reactive props
    const props = withDefaults(defineProps<{
        cardItem:Client
    }>(),{
        cardItem:()=>({
            id:-1,
            name:'No name',
            status:Status.Active,
            lastUpdate:new Date()
        })
    });
    

    // status data
    const statusConfig = computed(()=>
    {
        const config:Record<Status,{
            color:string,
            icon:string,
            class:string
        }> = {
            'Активен':{
                color:'success',
                icon:'mdi-check-circle',
                class:'active'
            },
            'Завершен':{
                color:"grey",
                icon:'mdi-',
                class:'complite'
            },
            'Новый':{
                color:"blue",
                icon:'mdi-new-box',
                class:'new'
            },
            'Проблемы':{
                color:'red',
                icon:'mdi-alert',
                class:'problems'
            },
            'Проверка':{
                color:'',
                icon:'',
                class:'check'
            }
            }
            return config[props.cardItem.status]
    })
// computed color icons class
const statusColor=computed(()=> statusConfig.value.color)
const statusIcon=computed(()=>statusConfig.value.icon)
const statusClass= computed(()=>statusConfig.value.class)

</script>
<style lang="sass" module>


</style>