import styled from 'styled-components';

// no le hagas caso a esto, es solo el css del Editor de Markdown

export default styled.div`
  .mde-header {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    border-bottom: 1px solid #c8ccd0;
    border-radius: 2px 2px 0 0;
    background: #f9f9f9;
  }
  .mde-header .mde-tabs {
    display: flex;
    flex-direction: row;
  }
  .mde-header .mde-tabs button {
    border-radius: 2px;
    margin: 6px 3px;
    background-color: transparent;
    border: 1px solid transparent;
    cursor: pointer;
  }
  .mde-header .mde-tabs button:first-child {
    margin-left: 6px;
  }
  .mde-header .mde-tabs button.selected {
    border: 1px solid #c8ccd0;
  }
  .mde-header .svg-icon {
    width: 1em;
    height: 1em;
    display: inline-block;
    font-size: inherit;
    overflow: visible;
    vertical-align: -0.125em;
  }
  .mde-header ul.mde-header-group {
    margin: 0;
    padding: 10px;
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
  }
  .mde-header ul.mde-header-group.hidden {
    visibility: hidden;
  }
  .mde-header ul.mde-header-group li.mde-header-item {
    display: inline-block;
    position: relative;
    margin: 0 4px;
  }
  .mde-header ul.mde-header-group li.mde-header-item button {
    text-align: left;
    cursor: pointer;
    height: 22px;
    padding: 4px;
    margin: 0;
    border: none;
    background: none;
    color: #242729;
  }

  @keyframes tooltip-appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .mde-header
    ul.mde-header-group
    li.mde-header-item
    button.tooltipped:hover::before {
    animation-name: tooltip-appear;
    animation-duration: 0.2s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    opacity: 0;
    position: absolute;
    z-index: 1000001;
    width: 0;
    height: 0;
    color: rgba(0, 0, 0, 0.8);
    pointer-events: none;
    content: '';
    border: 5px solid transparent;
    top: -5px;
    right: 50%;
    bottom: auto;
    margin-right: -5px;
    border-top-color: rgba(0, 0, 0, 0.8);
  }
  .mde-header
    ul.mde-header-group
    li.mde-header-item
    button.tooltipped:hover::after {
    animation-name: tooltip-appear;
    animation-duration: 0.2s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    font-size: 11px;
    opacity: 0;
    position: absolute;
    z-index: 1000000;
    padding: 5px 8px;
    color: #fff;
    pointer-events: none;
    content: attr(aria-label);
    background: rgba(0, 0, 0, 0.8);
    border-radius: 3px;
    right: 50%;
    bottom: 100%;
    transform: translateX(50%);
    margin-bottom: 5px;
    white-space: nowrap;
  }
  .mde-header ul.mde-header-group li.mde-header-item ul.react-mde-dropdown {
    position: absolute;
    left: 0;
    top: 30px;
    background-color: white;
    border: 1px solid #c8ccd0;
    padding: 5px;
    z-index: 2;
    transform: translateX(-9px);
  }
  .mde-header ul.mde-header-group li.mde-header-item ul.react-mde-dropdown li {
    margin: 0;
    white-space: nowrap;
    list-style: none;
    display: block;
  }
  .mde-header
    ul.mde-header-group
    li.mde-header-item
    ul.react-mde-dropdown
    li
    button {
    display: block;
    height: auto;
  }
  .mde-header
    ul.mde-header-group
    li.mde-header-item
    ul.react-mde-dropdown
    li
    button
    p {
    display: block;
    margin: 0;
    padding: 0;
    font-weight: bold;
    line-height: 1em;
    background: none;
    border: 0;
    text-align: left;
  }
  .mde-header
    ul.mde-header-group
    li.mde-header-item
    ul.react-mde-dropdown
    li
    button
    p:hover {
    color: #4078c0;
  }
  .mde-header
    ul.mde-header-group
    li.mde-header-item
    ul.react-mde-dropdown
    li
    button
    p.header-1 {
    font-size: 20px;
  }
  .mde-header
    ul.mde-header-group
    li.mde-header-item
    ul.react-mde-dropdown
    li
    button
    p.header-2 {
    font-size: 18px;
  }
  .mde-header
    ul.mde-header-group
    li.mde-header-item
    ul.react-mde-dropdown
    li
    button
    p.header-3 {
    font-size: 14px;
  }
  .mde-header
    ul.mde-header-group
    li.mde-header-item
    ul.react-mde-dropdown
    li
    button
    p.header-4 {
    font-size: 12px;
  }
  .mde-header
    ul.mde-header-group
    li.mde-header-item
    ul.react-mde-dropdown::before {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-bottom-color: rgba(0, 0, 0, 0.15);
    top: -16px;
    left: 3px;
    transform: translateX(50%);
  }
  .mde-header
    ul.mde-header-group
    li.mde-header-item
    ul.react-mde-dropdown::after {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border: 7px solid transparent;
    border-bottom-color: white;
    top: -14px;
    left: 5px;
    transform: translateX(50%);
  }

  .mde-textarea-wrapper {
    position: relative;
  }
  .mde-textarea-wrapper textarea.mde-text {
    width: 100%;
    border: 0;
    padding: 10px;
    vertical-align: top;
    resize: none;
    overflow-y: auto;
  }

  .mde-preview .mde-preview-content {
    padding: 10px;
  }
  .mde-preview .mde-preview-content p,
  .mde-preview .mde-preview-content blockquote,
  .mde-preview .mde-preview-content ul,
  .mde-preview .mde-preview-content ol,
  .mde-preview .mde-preview-content dl,
  .mde-preview .mde-preview-content table,
  .mde-preview .mde-preview-content pre {
    margin-top: 0;
    margin-bottom: 16px;
  }
  .mde-preview .mde-preview-content h1,
  .mde-preview .mde-preview-content h2,
  .mde-preview .mde-preview-content h3 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.3em;
  }
  .mde-preview .mde-preview-content h1 {
    font-size: 1.6em;
  }
  .mde-preview .mde-preview-content h2 {
    font-size: 1.4em;
  }
  .mde-preview .mde-preview-content h3 {
    font-size: 1.2em;
  }
  .mde-preview .mde-preview-content ul,
  .mde-preview .mde-preview-content ol {
    padding-left: 2em;
  }
  .mde-preview .mde-preview-content blockquote {
    margin-left: 0;
    padding: 0 1em;
    color: #777;
    border-left: 0.25em solid #ddd;
  }
  .mde-preview .mde-preview-content blockquote > :first-child {
    margin-top: 0;
  }
  .mde-preview .mde-preview-content blockquote > :last-child {
    margin-bottom: 0;
  }
  .mde-preview .mde-preview-content code {
    padding: 0.2em 0 0.2em 0;
    margin: 0;
    font-size: 90%;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 3px;
  }
  .mde-preview .mde-preview-content code::before,
  .mde-preview .mde-preview-content code::after {
    letter-spacing: -0.2em;
    content: '\x00a0';
  }
  .mde-preview .mde-preview-content pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f7f7f7;
    border-radius: 3px;
  }
  .mde-preview .mde-preview-content pre code {
    display: inline;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }
  .mde-preview .mde-preview-content pre code::before,
  .mde-preview .mde-preview-content pre code::after {
    content: none;
  }
  .mde-preview .mde-preview-content pre > code {
    padding: 0;
    margin: 0;
    font-size: 100%;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0;
  }
  .mde-preview .mde-preview-content a {
    color: #4078c0;
    text-decoration: none;
  }
  .mde-preview .mde-preview-content a:hover {
    text-decoration: underline;
  }
  .mde-preview .mde-preview-content > *:first-child {
    margin-top: 0 !important;
  }
  .mde-preview .mde-preview-content > *:last-child {
    margin-bottom: 0 !important;
  }
  .mde-preview .mde-preview-content::after {
    display: table;
    clear: both;
    content: '';
  }
  .mde-preview .mde-preview-content table {
    display: block;
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
  }
  .mde-preview .mde-preview-content table thead th {
    font-weight: bold;
  }
  .mde-preview .mde-preview-content table th,
  .mde-preview .mde-preview-content table td {
    padding: 6px 13px;
    border: 1px solid #c8ccd0;
  }

  .react-mde {
    border: 1px solid #c8ccd0;
    border-radius: 2px;
    display: grid;
    grid-template-rows: auto 1fr;
    height: inherit;
  }
  .react-mde > div:nth-child(2),
  .mde-textarea-wrapper,
  .mde-textarea-wrapper textarea {
    height: inherit !important;
    font-family: inherit !important;
  }
  .react-mde * {
    box-sizing: border-box;
  }
  .react-mde .grip {
    border-top: 1px solid #c8ccd0;
    background-color: #f9f9f9;
    text-align: center;
    height: 10px;
    color: black;
    cursor: s-resize;

    display: none;
    align-items: center;
    justify-content: center;
  }
  .react-mde .grip .icon {
    height: 10px;
  }
  .react-mde .invisible {
    display: none;
  }

  ul.mde-suggestions {
    position: absolute;
    min-width: 180px;
    padding: 0;
    margin: 20px 0 0;
    list-style: none;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c8ccd0;
    border-radius: 3px;
    box-shadow: 0 1px 5px rgba(27, 31, 35, 0.15);
  }
  ul.mde-suggestions li {
    padding: 4px 8px;
    border-bottom: 1px solid #e1e4e8;
  }
  ul.mde-suggestions li:first-child {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }
  ul.mde-suggestions li:last-child {
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
  }
  ul.mde-suggestions li:hover,
  ul.mde-suggestions li[aria-selected='true'] {
    color: white;
    background-color: #0366d6;
  }
`;
