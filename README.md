# Token Master. Figma plugin
# What is Token Master?

Token Master is a plugin for Figma that automates your color design tokens. With Token Master, you can edit styles in design tokens and quickly create new color modes. Just pick tokens with the same colors and edit them at once!

Link to the Figma plugin page

# **How it works**

1. Install Token Master from the link.
2. Download all styles from your file or add a new color mode. Use keywords [light] and [dark] in your style names to add new color mode. **Example:** [light]Style name/ [dark]Style name.
3. To edit a style, click on it. Then, you can use the eyedropper or the color picker in the modal window to select a color.
4. Also, you can copy the whole group of your design tokens and create a new color mode.

![Figma cover-2.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1ee1b438-ac40-4e19-9c14-bd26a54389af/Figma_cover-2.png)

![Figma cover.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7c82da75-17e6-4136-9bed-f1ede181b374/Figma_cover.png)

![Figma cover-1.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9e5eeb39-9e5d-4cf3-bae0-f42d969d962d/Figma_cover-1.png)

# **Styles name examples**

We recommend using [light] / [dark] at the beginning of the style name:

```jsx
[light] Color name 
[dark] Color name 
```

But you can use [light] / [dark] at any place of your style name:

```jsx
Color name [light]
Color name [dark]
```

```jsx
Style / color-name [light]
Style / color-name [dark]
```

```jsx
Style [light] / color-name
Style [dark] / color-name
```

<aside>
⚠️ Use unique names for the color mode ID.
Bad example:
❌*Light*India
❌*Light*

Good example:
✅Light
✅India

</aside>

# **How to install in the Dev environment**

1. Select the Plugins Page in the Figma File Browser
2. Use the plus (+) button in the Development section
3. Choose file manifest.json
4. Done

