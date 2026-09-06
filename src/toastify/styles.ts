export const toastifyStyles = `
/* Toastify Standalone CSS */
@keyframes toastify-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.toastify-spin {
  animation: toastify-spin 1s linear infinite;
}

.toastify-toaster {
  position: fixed;
  z-index: 9999;
  width: 356px;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0;
  padding: 0;
}

.toastify-toaster *,
.toastify-toaster *::before,
.toastify-toaster *::after {
  box-sizing: border-box;
}

/* Positions */
.toastify-pos-top-left {
  top: 24px;
  left: 24px;
}
.toastify-pos-top-center {
  top: 24px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
.toastify-pos-top-right {
  top: 24px;
  right: 24px;
}
.toastify-pos-bottom-left {
  bottom: 24px;
  left: 24px;
}
.toastify-pos-bottom-center {
  bottom: 24px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
.toastify-pos-bottom-right {
  bottom: 24px;
  right: 24px;
}

.toastify-pointer-auto {
  pointer-events: auto;
}
.toastify-pointer-none {
  pointer-events: none;
}

/* Toast List Container */
.toastify-list {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}
.toastify-list-col {
  flex-direction: column;
}
.toastify-list-col-reverse {
  flex-direction: column-reverse;
}

/* Individual Toast Item wrapper */
.toastify-item {
  position: absolute;
  height: 56px;
  width: 100%;
  user-select: none;
  cursor: grab;
}
.toastify-item:active {
  cursor: grabbing;
}

/* Toast Card with Tactile Micro-bevels */
.toastify-toast {
  display: flex;
  height: 56px;
  width: 100%;
  user-select: none;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-radius: 8px;
  padding: 0 14px;
  box-sizing: border-box;
  transition: background-color 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  
  /* Light theme default */
  background-color: #ffffff;
  border: 1px solid rgba(229, 231, 235, 0.9);
  color: #111827;
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04);
}

/* Dark theme overrides */
.toastify-toaster.dark .toastify-toast,
[data-theme="dark"] .toastify-toast,
.dark .toastify-toast {
  background-color: #171717;
  border: 1px solid rgba(38, 38, 38, 0.9);
  color: #f5f5f5;
  box-shadow: 0 4px 14px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.25);
}

/* System dark theme preference when theme="system" */
@media (prefers-color-scheme: dark) {
  .toastify-toaster.system .toastify-toast {
    background-color: #171717;
    border: 1px solid rgba(38, 38, 38, 0.9);
    color: #f5f5f5;
    box-shadow: 0 4px 14px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.25);
  }
  .toastify-toaster.system .toastify-badge {
    background-color: #ffffff;
    color: #0a0a0a;
  }
  .toastify-toaster.system .toastify-title {
    color: #f5f5f5;
  }
  .toastify-toaster.system .toastify-description {
    color: #a3a3a3;
  }
  .toastify-toaster.system .toastify-btn-cancel {
    color: #a3a3a3;
  }
  .toastify-toaster.system .toastify-btn-cancel:hover {
    background-color: #262626;
    color: #f5f5f5;
  }
  .toastify-toaster.system .toastify-btn-action {
    background-color: #f5f5f5;
    color: #171717;
    box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.22), 0 1px 2px rgba(0, 0, 0, 0.15);
  }
  .toastify-toaster.system .toastify-btn-action:hover {
    background-color: #e5e5e5;
  }
}

/* Badge Icon Wrapper */
.toastify-badge {
  display: flex;
  height: 20px;
  width: 20px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #171717;
  color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.toastify-toaster.dark .toastify-badge,
[data-theme="dark"] .toastify-badge,
.dark .toastify-badge {
  background-color: #ffffff;
  color: #0a0a0a;
}

/* Content Area */
.toastify-content {
  display: flex;
  min-width: 0;
  flex: 1 1 0%;
  align-items: center;
  gap: 12px;
}

.toastify-text-group {
  display: flex;
  min-width: 0;
  flex-direction: column;
  justify-content: center;
}

.toastify-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
  color: #171717;
}

.toastify-toaster.dark .toastify-title,
[data-theme="dark"] .toastify-title,
.dark .toastify-title {
  color: #f5f5f5;
}

.toastify-description {
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  line-height: 16px;
  color: #737373;
}

.toastify-toaster.dark .toastify-description,
[data-theme="dark"] .toastify-description,
.dark .toastify-description {
  color: #a3a3a3;
}

/* Action Area */
.toastify-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 8px;
}

.toastify-btn-cancel {
  cursor: pointer;
  border: none;
  background: transparent;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  color: #525252;
  transition: background-color 0.15s, color 0.15s;
}

.toastify-btn-cancel:hover {
  background-color: #f5f5f5;
  color: #171717;
}

.toastify-toaster.dark .toastify-btn-cancel,
[data-theme="dark"] .toastify-btn-cancel,
.dark .toastify-btn-cancel {
  color: #a3a3a3;
}

.toastify-toaster.dark .toastify-btn-cancel:hover,
[data-theme="dark"] .toastify-btn-cancel:hover,
.dark .toastify-btn-cancel:hover {
  background-color: #262626;
  color: #f5f5f5;
}

.toastify-btn-action {
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  background-color: #171717;
  color: #ffffff;
  transition: background-color 0.15s, box-shadow 0.15s;
  box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.08);
}

.toastify-btn-action:hover {
  background-color: #262626;
}

.toastify-btn-action:active {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
}

.toastify-toaster.dark .toastify-btn-action,
[data-theme="dark"] .toastify-btn-action,
.dark .toastify-btn-action {
  background-color: #f5f5f5;
  color: #171717;
  box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.22), 0 1px 2px rgba(0, 0, 0, 0.15);
}

.toastify-toaster.dark .toastify-btn-action:hover,
[data-theme="dark"] .toastify-btn-action:hover,
.dark .toastify-btn-action:hover {
  background-color: #e5e5e5;
}

.toastify-toaster.dark .toastify-btn-action:active,
[data-theme="dark"] .toastify-btn-action:active,
.dark .toastify-btn-action:active {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.25);
}
`;
