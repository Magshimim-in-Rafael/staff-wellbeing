import{o as e,s as t}from"./i18n-BimXFCsr.js";var n=t(),r=e();function i(e){let t=(0,n.c)(3),{type:i,label:a}=e,o=`
        inline-flex items-center rounded-sm px-2 py-0.5
        text-micro font-semibold uppercase
        ${i===`low`?`bg-alert-low-bg text-alert-low-fg`:`bg-alert-high-bg text-alert-high-fg`}
      `,s;return t[0]!==a||t[1]!==o?(s=(0,r.jsx)(`span`,{className:o,children:a}),t[0]=a,t[1]=o,t[2]=s):s=t[2],s}export{i as t};