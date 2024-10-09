function generateResponsiveGrid(columns, rows, gap = '10px', breakpoints = {}) {
    let baseGrid = `
    .grid-container {
        display: grid;
        grid-template-columns: repeat(${columns}, 1fr);
        grid-template-rows: repeat(${rows}, auto);
        gap: ${gap};
    }
    `;
    const breakPointCss = Object.entries(breakpoints).map(([size, config]) => `
    @media (max-width: ${size}px) {
        .grid-container {
            grid-template-columns: repeat(${config.columns}, 1fr);
            grid-template-rows: repeat(${config.rows}, auto);
            gap: ${config.gap || gap};
        }
    }
    `).join('');
    return baseGrid + breakPointCss;
}
module.exports = { generateResponsiveGrid };