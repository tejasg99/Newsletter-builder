function generateBlockHtml(block) {
  const styleString = Object.entries(block.styles)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');

  switch (block.type) {
    case 'text':
      return `
        <div style="${styleString}">
          ${block.content.text}
        </div>
      `;

    case 'image':
      return `
        <div style="${styleString}">
          <img
            src="${block.content.src}"
            alt="${block.content.alt}"
            style="max-width: 100%; height: auto;"
          />
        </div>
      `;

    case 'button':
      return `
        <div style="text-align: center; ${styleString}">
          <a
            href="${block.content.url}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              display: inline-block;
              padding: ${block.styles.padding};
              background-color: ${block.styles.backgroundColor};
              color: ${block.styles.color};
              border-radius: ${block.styles.borderRadius};
              border: ${block.styles.border};
              cursor: ${block.styles.cursor};
              text-decoration: none;
            "
          >
            ${block.content.text}
          </a>
        </div>
      `;

    case 'spacer':
      return `
        <div style="width: 100%; height: ${block.content.height};"></div>
      `;

    case 'columns':
      return `
        <div style="${styleString}">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              ${block.content.columns.map(column => `
                <td style="width: 50%; vertical-align: top; padding: 10px;">
                  ${column.map(childBlock => generateBlockHtml(childBlock)).join('')}
                </td>
              `).join('')}
            </tr>
          </table>
        </div>
      `;

    default:
      return '';
  }
}

export function generateNewsletterHtml(blocks) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Newsletter</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          td {
            vertical-align: top;
          }
        </style>
      </head>
      <body>
        ${blocks.map(block => generateBlockHtml(block)).join('')}
      </body>
    </html>
  `;

  return html;
} 