/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'val-econ': '#f44336',
                'val-mrkt': '#00897b',
                'val-dipl': '#ff9800',
                'val-glob': '#03a9f4',
                'val-govt': '#ffeb3b',
                'val-auth': '#3f51b5',
                'val-scty': '#4caf50',
                'val-trad': '#8bc34a',
            },
        },
    },
    plugins: [],
}
