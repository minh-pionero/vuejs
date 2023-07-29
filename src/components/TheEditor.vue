<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'

const configEditor = {
  heigh: 500,
  plugins: [
    'advlist autolink link responsivefilemanager lists charmap print preview hr anchor pagebreak spellchecker',
    'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
    'save table contextmenu directionality template paste textcolor colorpicker responsivefilemanager autoresize',
    'image'
  ],
  toolbar:
    'undo redo | styleselect | bold italic | forecolor backcolor | alignleft aligncenter alignright | bullist numlist | outdent indent | table | image | link responsivefilemanager defaultbtn',
  image_advtab: true
}
</script>

<template>
  <div>
    <Editor :init="configEditor" />
  </div>
</template>
