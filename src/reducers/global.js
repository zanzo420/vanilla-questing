import { update as update_profiles, change as update_block } from "../funcs/storage";
import { update_bind, update_prop } from "../funcs/settings";

function global(state, action) {
   switch (action.type) {

      // ON THE INITIAL PAGE LOAD
      case 'init': { return {
         ...state,
         profiles: action.payload.profiles,
         settings: action.payload.settings,
         data: action.payload.data,
         current: action.payload.current,
         prompt: {
            ...state.prompt,
            visible: false
         }
      }}

      // LOAD PROFILE
      case 'load-profile': { return {
         ...state,
         data: action.payload.build.data,
         current: action.payload.build.current,
         loaded: action.payload.profile,
         message: {
            visible: true,
            type: 'good',
            value: action.payload.msg
         }
      }}

      // REMOVE PROFILE
      case 'remove-profile': { return {
         ...state,
         profiles: update_profiles(action.payload.profiles),
         message: {
            visible: true,
            type: 'good',
            value: action.payload.msg
         }
      }}

      // ADD PROFILE
      case 'add-profile': { return {
         ...state,
         data: action.payload.data,
         current: action.payload.current,
         loaded: action.payload.profile,
         profiles: update_profiles(action.payload.profiles),
         message: {
            visible: true,
            type: 'good',
            value: action.payload.msg
         },
         prompt: {
            ...state.prompt,
            visible: false
         }
      }}

      // CREATE PROFILE PROMPT
      case 'create-prompt': { return {
         ...state,
         request: action.payload,
         prompt: {
            visible: true,
            type: 'create'
         }
      }}

      // CHANGE BLOCK
      case 'block': { return {
         ...state,
         current: update_block(state, action.payload)
      }}

      // SHOW PROMPT WITH APPROPARIATE CONTENT
      case 'show-prompt': { return {
         ...state,
         prompt: {
            visible: true,
            type: action.payload
         }
      }}

      // HIDE PROMPT
      case 'hide-prompt': { return {
         ...state,
         prompt: {
            ...state.prompt,
            visible: false
         }
      }}

      // SHOW MESSAGE
      case 'show-message': { return {
         ...state,
         message: {
            visible: true,
            type: action.payload.type,
            value: action.payload.value
         }
      }}

      // HIDE MESSAGE
      case 'hide-message': { return {
         ...state,
         message: {
            visible: false,
            type: undefined,
            value: undefined
         }
      }}

      // CHANGE KEYBIND
      case 'change-keybind': { return {
         ...state,
         settings: update_bind(state.settings, action.payload)
      }}

      // CHANGE SETTING
      case 'change-setting': { return {
         ...state,
         settings: update_prop(state.settings, action.payload)
      }}

      // FALLBACK
      default: {
         console.log('Context reducer type not found');
         return state;
      }
   }
}

export default global;