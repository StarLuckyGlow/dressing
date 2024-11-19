(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function r(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();const d=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],l=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],f={子:"water",亥:"water",寅:"wood",卯:"wood",巳:"fire",午:"fire",申:"metal",酉:"metal",辰:"earth",戌:"earth",丑:"earth",未:"earth"},m={water:"水",wood:"木",fire:"火",metal:"金",earth:"土"},u={water:["黑色","蓝色","灰色"],wood:["绿色","青色","翠色","浅绿色"],fire:["红色","粉色","橙色","紫色"],metal:["白色","银色","杏色","乳白色"],earth:["黄色","咖色","棕色","卡其色"]},h={wood:["fire","wood","metal","water","earth"],fire:["earth","fire","water","wood","metal"],earth:["metal","earth","wood","fire","water"],metal:["water","metal","fire","earth","wood"],water:["wood","water","earth","metal","fire"]},v={0:"这个颜色最适合今天穿着，能让你气场全开，轻松驾驭各种场合，贵人运势旺盛。",1:"这个颜色带来稳定平和的能量，有助于保持心情愉悦，提升个人魅力。",2:"这个颜色能带来中性能量，适合日常穿着，让你保持平稳运势。",3:"这个颜色今天穿着需要谨慎，建议作为点缀使用。",4:"这个颜色今天不太适合大面积使用，建议暂时避开。"};function p(s){const o=(s-4)%60,n=o%10,r=o%12;return`${d[n]}${l[r]}`}function y(s,o){const n=(s-4)%60%10,t=[2,3,4,5,6,7,8,9,10,11,0,1][o-1];let e;(n===0||n===5)&&(e=2),(n===1||n===6)&&(e=4),(n===2||n===7)&&(e=6),(n===3||n===8)&&(e=8),(n===4||n===9)&&(e=0);const a=(e+o-1)%10;return`${d[a]}${l[t]}`}function b(s){const o=new Date(2024,10,14),n=d.indexOf("壬"),r=l.indexOf("午"),t=Math.floor((s-o)/(24*60*60*1e3)),e=(n+t)%10,a=(r+t)%12,c=e>=0?e:(e+10)%10,i=a>=0?a:(a+12)%12;return`${d[c]}${l[i]}`}function g(s){const o=s.getFullYear(),n=s.getMonth()+1;return{year:p(o),month:y(o,n),day:b(s)}}function w(s){return f[s]}function x(s){const o=h[s];let n="";return o.forEach((r,t)=>{const e=u[r],a=v[t];n+=`
      <div class="mb-6 p-6 bg-white rounded-lg shadow-md">
        <div class="flex items-center gap-4 mb-4">
          <div class="text-2xl font-bold">${t+1}</div>
          <div>
            <h4 class="text-lg font-semibold mb-2">${m[r]}行色系</h4>
            <div class="text-gray-600">${e.join("、")}</div>
          </div>
        </div>
        <p class="text-gray-700">${a}</p>
      </div>
    `}),n}document.addEventListener("DOMContentLoaded",()=>{const s=document.getElementById("dateInput"),o=document.getElementById("calculateBtn"),n=document.getElementById("result"),r=document.getElementById("resultText"),t=new Date;s.valueAsDate=t,o.addEventListener("click",()=>{if(!s.value){alert("请选择日期");return}const e=new Date(s.value),a=g(e),c=a.day.slice(-1),i=w(c);n.classList.remove("hidden"),r.innerHTML=`
      <div class="space-y-4">
        <div class="mb-6">
          <div class="font-semibold mb-2">干支历：</div>
          <div class="pl-4">
            <div>年：<span class="font-semibold">${a.year}年</span></div>
            <div>月：<span class="font-semibold">${a.month}月</span></div>
            <div>日：<span class="font-semibold">${a.day}日</span></div>
          </div>
        </div>
        <div class="mb-4">
          <div>日支：<span class="font-semibold">${c}</span></div>
          <div>五行属性：<span class="font-semibold">${m[i]}行</span></div>
        </div>
        <div class="mt-8">
          <h3 class="text-xl font-bold mb-6">今日穿搭建议（按优先级排序）：</h3>
          ${x(i)}
        </div>
      </div>
    `}),o.click()});
