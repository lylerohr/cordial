!function(){function e(e){return o.then(function(n){for(var a=0,t=n.length;a<t;a++)if(n[a].path===e)return!0;return!1})}function n(e){return new Promise(function(n,a){$u.xhr({url:e,callback:function(e){e.status<400&&e.responseText?n(e.responseText):a()}})})}function a(e){var n=u[e],a="<h1>"+n.title+"</h1>";if(n.overrideExampleHeader)return a;if(n.alias){var t=n.alias;"Array"!==Prism.util.type(t)&&(t=[t]),a+="<p>To use this language, use one of the following classes:</p>",a+='<ul><li><code class="language-none">"language-'+e+'"</code></li>',t.forEach(function(e){a+='<li><code class="language-none">"language-'+e+'"</code></li>'}),a+="</ul>"}else a+='<p>To use this language, use the class <code class="language-none">"language-'+e+'"</code>.</p>';if(n.require){var s=n.require;"Array"!==Prism.util.type(s)&&(s=[s]),a+="<p><strong>Dependencies:</strong> The following dependencies need to be loaded before this component: ",a+=s.map(function(e){return'<code class="language-none">'+e+"</code>"}).join(", "),a+=".</p>"}return a}function t(e){var t=u[e];t.enabled?(t.examplesPromise||(t.examplesPromise=n(t.examplesPath)),t.examplesPromise.then(function(n){l[e].innerHTML=a(e)+n,s(e).then(function(){for(var n=l[e].querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),a=0,t;t=n[a++];)Prism.highlightElement(t)})})):l[e].innerHTML=""}function s(e){var n=r(e).map(s);return Promise.all(n).then(function(){if(!Prism.languages[e])return new Promise(function(n){$u.script("components/prism-"+e+".js",n)})})}function r(e){return components.languages[e]&&components.languages[e].require?"array"===$u.type(components.languages[e].require)?components.languages[e].require:[components.languages[e].require]:[]}var l={},i="https://api.github.com/repos/PrismJS/prism/git/trees/gh-pages?recursive=1",o=new Promise(function(e){$u.xhr({url:i,callback:function(n){n.status<400&&e(JSON.parse(n.responseText).tree)}})}),u=components.languages;for(var c in u)"meta"!==c&&function(n){var a=u[n],s=!1;"default"===a.option&&(s=!0),a.enabled=s,a.path=u.meta.path.replace(/\{id}/g,n)+".js",a.examplesPath=u.meta.examplesPath.replace(/\{id}/g,n)+".html",e(a.examplesPath).then(function(e){$u.element.create("label",{attributes:{"data-id":n,title:e?"":"No examples are available for this language."},className:e?"":"unavailable",contents:[{tag:"input",properties:{type:"checkbox",name:"language",value:n,checked:s&&e,disabled:!e,onclick:function(){$$('input[name="'+this.name+'"]').forEach(function(e){u[e.value].enabled=e.checked}),t(n)}}},a.title],inside:"#languages"}),l[n]=$u.element.create("section",{id:"language-"+n,className:"language-"+n,inside:"#examples"}),s&&t(n)})}(c)}();