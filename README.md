# Vue Flash 3

A very simple and lightweight notification toolbox.

## Getting started

* Install the package

```sh
npm i vue-flash3
```

* Include the component once somewhere on the DOM

```vue
<style>
@import 'vue-flash3';
</style>

<template>
  <Flash />
</template>

<script setup lang="ts">
import { Flash } from 'vue-flash3'
</script>
```

* Show a message

```js
import { instance as FlashI } from 'vue-flash3'

FlashI.add('That\'s a very nice success message')
```

![First notification](./images/sc-success-notif.png)

_Clicking on the notification makes it disappear. It can also [disappear after a duration](#message-duration) if specified_

## Message types

There are 3 builtin types of messages: `success` (the default), `error`, `info`

```js
import { instance as FlashI } from 'vue-flash3'

FlashI.add('That\'s a very nice success message', 'success')
FlashI.add('Oups some error has occured !', 'error')
FlashI.add('Some info won\'t hurt', 'info')
```

![Builtin notifications](./images/sc-basic-notifs.png)

However any other types can be defined simply by setting [a color](#colors) and [an icon](#icons)

## Message duration

A third optionnal param is here to set the duration in milliseconds after which the notification disappears.
_The default is 0 meaning the notification should stay_

```js
import { instance as FlashI } from 'vue-flash3'

FlashI.add('That\'s a very nice success message', 'success', 5000) // Will be shown 5 seconds
```

## Removing a message

The `add()` function returns the notification so it can be removed programmatically with `remove()`

```vue
<template>
  <button @click="remove">Remove</button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { instance as FlashI } from 'vue-flash3'

const notif

onMounted(() => {
  notif = FlashI.add('Removable notif')
})

function remove() {
  FlashI.remove(notif)
}
</script>
```

## Customizing

### Colors

This default sass map can be overridden

```scss
$flash-colors: (
    info: #018495,
    error: #b13229,
    success: #429344,
);
```

Any type can be added and colors defined

**Example**

```scss
@use "vue-flash3/scss" with (
  $flash-colors: (
      toto: rgb(157, 32, 136),
  )
);
```

```js
import { instance as FlashI } from 'vue-flash3'

FlashI.add('A Violet notification', 'toto')
```

![Custom color](./images/sc-violet-notif.png)

### Icons

The icon part can contain anything by implementing the `icons` slot

**Example**

```vue
<template>
  <Flash>
    <template #icons="slotProps">
      <IconInfo v-if="slotProps.type === 'info'" />
    </template>
  </Flash>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Flash, instance as FlashI } from 'vue-flash3'
import IconInfo from './icons/info-circle-solid.svg'

onMounted(() => {
    FlashI.add('Some info won\'t hurt', 'info')
})
</script>
```

_We are using [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader) here with an icon from [Font-Awesome](https://fontawesome.com/)_

![Custom icon](./images/sc-custom-icon.png)

Icons can also be disabled by simply setting the `noicon` prop

```vue
<Flash :noicon="true" />
```

![No icon](./images/sc-no-icon.png)

### HTML

HTML content can be defined on the message (watch out for XSS)

```js
FlashI.add('A Violet<br />notification', 'toto')
```

![HTML content](./images/sc-html-message.png)

### Putting it all together

```vue
<style lang="scss">
@use "vue-flash3/scss" with (
  $flash-colors: (
      toto: rgb(120, 137, 19),
  )
);
</style>

<template>
  <Flash>
    <template #icons="slotProps">
      <span v-if="slotProps.type === 'toto'">&clubs;</span>
    </template>
  </Flash>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Flash, instance as FlashI } from './flash'

onMounted(() => {
  FlashI.add('<b>Nice title</b><div>We are feeling lucky today</div>', 'toto')
})
</script>
```

![All together](./images/sc-all-together.png)

# Develop

To run the dev env, a Vite Vue app is contained into the `app` directory, [Docker](https://www.docker.com/) can be used to have it installed out of the box:

```sh
docker compose up -d
```

The dev application is now accessible on http://localhost
