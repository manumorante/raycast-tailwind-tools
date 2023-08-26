# Prepare

Here are some **Node scripts** to prepare the files needed for the extension.

## How to use

Si tu Tailwind no está personalizado no hay que hacer nada, ya está precompilado con los valores por defecto.

Para personalizarlo, hay que seguir los siguientes pasos:

- Haz los ajustes que consideres en el archivo `tailwind.config.js`.
- Revisar el patrón actual `pattern: /./,` dentro de `safelist` este hace que se genere todas las utility clases disponibles.

## What it does

- Create a `css` file with a full default **Tailwind CSS**.

## WIP

- Or create a **custom Tailwind** based on the `taildwind.config.js` indicated in the extension's preferences.
