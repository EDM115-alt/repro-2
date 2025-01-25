import Vue from "@vitejs/plugin-vue"
import hljs from "highlight.js"
import mditAttrs from "markdown-it-attrs"
import mditHljs from "markdown-it-highlightjs"
import Markdown from "unplugin-vue-markdown/vite"
import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    Vue({
      features: { optionsAPI: false },
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown({
      markdownItOptions: {
        breaks: true,
        html: true,
        linkify: true,
        typographer: true
      },
      markdownItSetup(md) {
        md.use(mditHljs, {
          hljs,
          inline: true
        }),
        md.use(mditAttrs),
        md.renderer.rules.fence = (tokens, idx) => {
          const token = tokens[idx]
          const langName = token.info.trim()
          const isSupported = hljs.getLanguage(langName)

          const highlightedCode = isSupported
            ? hljs.highlight(token.content, { language: langName }).value
            : hljs.highlightAuto(token.content).value

          // Return the HTML with language label and copy button
          return `
            <div class='code-block'>
              <div class='code-block-header'>
                <span class='code-block-lang'>${langName || "plaintext"}</span>
                <button class='copy-code-button' onclick='
                  navigator.clipboard.writeText(\`${token.content}\`);
                  const btn = this;
                  btn.textContent = "Copied !";
                  btn.classList.add("copy-code-button-clicked");

                  setTimeout(() => {
                    btn.textContent = "Copy";
                    btn.classList.remove("copy-code-button-clicked");
                    btn.classList.add("copy-code-button");
                  }, 3000);
                '>
                  Copy
                </button>
              </div>
              <pre><code class='hljs ${langName}'>${highlightedCode}</code></pre>
            </div>
          `
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})
