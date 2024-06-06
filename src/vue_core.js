import { effect } from "./vue_main";

let uid = 0;
var prefixCache = {};
var isArray = Array.isArray;
var isModelListener = (key) => key.startsWith("onUpdate:");
var semicolonRE = /[^\\];\s*$/;
var Text = Symbol('Text')
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var doc = typeof document !== "undefined" ? document : null;
var extend = Object.assign;
var isString = (val) => typeof val === "string";
var isSuspense = (type) => type.__isSuspense;
var isTeleport = (type) => type.__isTeleport;
var isObject = (val) => val !== null && typeof val === "object";
var isFunction = (val) => typeof val === "function";
var isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97); // uppercase letter
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
var nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content;
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = null;
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (true) {
      if (semicolonRE.test(val)) {
        warn2(
          `Unexpected semicolon at the end of '${name}' style value: '${val}'`
        );
      }
    }
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  console.log(el, rawName, prevValue, nextValue)
  el.addEventListener('click', nextValue, false)
  // const invokers = el[veiKey] || (el[veiKey] = {});
  // const existingInvoker = invokers[rawName];
  // if (nextValue && existingInvoker) {
  //   existingInvoker.value = nextValue;
  // } else {
  //   const [name, options] = parseName(rawName);
  //   if (nextValue) {
  //     const invoker = invokers[rawName] = createInvoker(nextValue, instance);
  //     addEventListener(el, name, invoker, options);
  //   } else if (existingInvoker) {
  //     removeEventListener(el, name, existingInvoker, options);
  //     invokers[rawName] = void 0;
  //   }
  // }
}
var patchProp = (el, key, prevValue, nextValue, namespace, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    // patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(
      el,
      key,
      nextValue,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren
    );
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};

var rendererOptions = extend({ patchProp }, nodeOps);

function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}

function createVNode(type, props, children) {
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  const vnode = {
    __v_isVNode: true,
    type,
    props,
    children,
    component: null,
    el: null,
    key: props && props.key,
    shapeFlag
  }
  normalizeChildren(vnode, children);
  return vnode
}
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const instance = {
    uid: uid++,
    vnode,
    type,
    ctx: {},
    render: null,
    data: {},
    props: {},
    attrs: {},
    slots: {},
    setupState: {},
    isMounted: false,
  };
  instance.ctx = { _: instance };
  return instance;
}
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { setupState, data, props } = instance;
    if (hasOwn(setupState, key)) {
      return setupState[key]
    } else if (hasOwn(props, key)) {
      return props[key]
    } else if (hasOwn(data, key)) {
      return data[key]
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, props } = instance;
    if (hasOwn(setupState, key)) {
      setupState[key] = value
    } else if (hasOwn(props, key)) {
      props[key] = value
    } else if (hasOwn(data, key)) {
      data[key] = value
    }
    return true;
  },
}
export function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
function setupStatefulComponent(instance) {
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers)
  const Component = instance.type;
  const { setup } = Component;
  if (setup) {
    let setupContext = createContext(instance)
    const setupResult = setup(instance.props, setupContext)
    handleSetupResult(instance, setupResult)
  } else {
    finishComponentSetup(instance)
    // render(instance.proxy)
  }
}
function handleSetupResult(instance, setupResult) {
  if (isFunction(setupResult)) {
    instance.render = setupResult;
  } else if (isObject(setupResult)) {
    instance.setupResult = setupResult
  }
  finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
  let Component = instance.type
  if (!instance.render) {
    if (!Component.render && Component.template) {
      console.log('模板编译')
    }
    instance.render = Component.render
  }
}
function createContext(instance) {
  return {
    attrs: instance.attrs,
    props: instance.props,
    slots: instance.slots,
    emit: () => { },
    expose: () => { }
  }
}
function setupComponent(instance) {
  const { props, children } = instance.vnode;

  const isStateful = instance.vnode.shapeFlag & 4;
  instance.props = props
  instance.children = children

  const setupResult = isStateful ? setupStatefulComponent(instance) : void 0;
  return setupResult;
}
function normalizeVNode(child) {
  if (isObject(child)) return child
  return createVNode(Text, null, String(child))
}
function createRenderer(options) {
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  //组件更新
  const setupRenderEffect = (instance, container) => {
    instance.update = effect(function componentEffect() {
      let proxyToUse = instance.proxy
      let subTree = instance.subTree = instance.render.call(proxyToUse, proxyToUse)
      if (!instance.isMounted) {
        patch(null, subTree, container)
        instance.isMounted = true
        console.log(subTree)
      } else {
        // diff 算法
        console.log('更新逻辑')
        const prevTree = instance.subTree
        const nextTree = instance.render.call(proxyToUse, proxyToUse)
        patch(prevTree, nextTree, container)
      }
    })
  }
  const mountComponent = (initialVNode, container) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
    );
    setupComponent(instance);

    setupRenderEffect(instance, container)
  };
  const processComponent = (n1, n2, container) => {
    // n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      mountComponent(
        n2,
        container,
      );
    } else {
      // updateComponent(n1, n2, optimized);
    }
  };

  const mountChildren = (children, container) => {
    for (let i = 0; i < children.length; i++) {
      const child = normalizeVNode(children[i]);
      patch(
        null,
        child,
        container
      );
    }
  }
  const mountElement = (vnode, container, anchor) => {
    let el;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, "created");
    }
    if (props) {
      for (const key in props) {
        hostPatchProp(
          el,
          key,
          null,
          props[key],
        );
      }
    }
    hostInsert(el, container, anchor);
  }

  const patchElement = (n1, n2, container) => {
    // 元素更新
  }
  const processElement = (n1, n2, container, anchor) => {
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor
      );
    } else {
      patchElement(
        n1,
        n2,
        container,
      );
    }
  };
  const processText = (n1, n2, container) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const patch = (n1, n2, container, anchor = null) => {
    const { type, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container)
        break;
      default:
        if (shapeFlag & 1) {
          console.log('元素')
          processElement(n1, n2, container)
        } else if (shapeFlag == 4) {
          console.log('组件')
          processComponent(n1, n2, container)
        }
    }

  }
  const render = (vnode, container) => {
    // core 
    patch(null, vnode, container)
  }
  return {
    createApp(rootComponent, rootProps) {
      const app = {
        mount(container) {
          const vnode = createVNode(rootComponent, rootProps);
          render(vnode, container)
        }
      }
      return app
    }
  }
}

export function createApp(rootComponent, rootProps = null) {
  const app = createRenderer(rendererOptions).createApp(rootComponent, rootProps)
  const { mount } = app
  app.mount = function (container) {
    container = nodeOps.querySelector(container)
    container.innerHTML = "";
    mount(container)
  }
  return app
}