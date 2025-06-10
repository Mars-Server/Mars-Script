// @ts-check

import { Player } from "@minecraft/server";

/**
 * @param {string} name 
 * @param {any} contents 
 */
function send(name, contents = {}) {
    const json = JSON.stringify({ name, contents });
    console.log(`MARS:SCRIPT_COMMAND:${json}`);
}

/**
 * サーバーのリロードを行います。
 */
export function reload() {
    send("reload");
}

/**
 * サーバーを停止します。
 */
export function stop() {
    send("stop");
}

/**
 * サーバーを再起動します。
 */
export function restart() {
    send("restart");
}

/**
 * サーバーのバックアップを行います。
 */
export function backup() {
    send("backup");
}

/**
 * サーバーをアップデートします。
 */
export function update() {
    send("update");
}

/**
 * プレイヤーを特定のサーバーに転送します。
 * @param {string} playerName 
 * @param {string} host 
 * @param {number} port
 */
export function transfer(playerName, host, port) {
    if (typeof playerName !== "string") return;
    if (typeof host !== "string") return;
    if (typeof port !== "number") return;

    send("transfer", { playerName, host, port });
}

/**
 * プレイヤーを理由と共にキックします。
 * @param {string} playerName 
 * @param {string?} reason 
 */
export function kick(playerName, reason = "") {
    if (typeof playerName !== "string") return;
    if (typeof reason !== "string") return;

    send("kick", { playerName, reason });
}

/**
 * ホワイトリストの追加や削除を行います。
 * @param {"add" | "remove"} type 
 * @param {string} playerName 
 * @param {boolean?} igLimit 
 */
export function allowlist(type, playerName, igLimit = false) {
    if (type !== "add" && type !== "remove") return;
    if (typeof playerName !== "string") return;

    send("allowlist", { type, playerName, igLimit });
}
