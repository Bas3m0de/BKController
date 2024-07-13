// ==UserScript==
// @name                BurgerKing Controller V3
// @description         BurgerKing Eğitim Videolarını Geçme Amaçlı Yazılmıştır.
// @version             1.7
// @author              GizliBKPersoneli :)
// @namespace           io.github.Bas3m0de
// @match               *://*/*
// @grant               none
// ==/UserScript==

let video;
let speed = 1;

document.addEventListener("playing", registerShortcutKeys, { capture: true, once: true });
document.addEventListener("playing", restoreSpeed, { capture: true });
document.addEventListener("ended", handleVideoEnded);

function registerShortcutKeys(event) {
  captureActiveVideoElement(event);
  document.addEventListener("keydown", handlePressedKey);
}

function restoreSpeed(event) {
  if (event.target.playbackRate !== speed) event.target.playbackRate = speed;
}

function captureActiveVideoElement(event) {
  video = event.target;
  speed = video.playbackRate;
}

function handlePressedKey(event) {
  const target = event.target;
  if (target.localName === "input" || target.localName === "textarea" || target.isContentEditable) return;

  const key = event.key;
  if (key === ",") video.playbackRate -= 0.5;
  else if (key === ".") video.playbackRate += 0.5;
  else if (key === ";") video.playbackRate = 1;
  else if (key === "'") video.playbackRate = 2.5;
  else if (key === "[") video.playbackRate = 2;
  else if (key === "]") video.playbackRate = 1.75;
  else if (key === "*") {
    video.playbackRate = 15.75;
    video.addEventListener("ended", handleVideoEnded);
  }

  speed = video.playbackRate;
}

function handleVideoEnded() {
  const nextButton = document.querySelector('button[class*="rectangular"][class*="text-normal"]');
  if (nextButton) {
    nextButton.click();
    setTimeout(() => {
      const newVideo = document.querySelector("video");
      if (newVideo) {
        newVideo.playbackRate = 15.75;
        newVideo.play();
      }
    }, 2000); 
  }
}
