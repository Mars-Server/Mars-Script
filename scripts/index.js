// @ts-check

import { CommandPermissionLevel, CustomCommandParamType, Player, system, world } from "@minecraft/server";
import { allowlist, backup, kick, reload, restart, stop, transfer, update } from "./modules/marsScript";

system.beforeEvents.startup.subscribe(ev => {
    const { customCommandRegistry } = ev;
    const prefix = "mars";

    // reload
    customCommandRegistry.registerCommand({
        name: `${prefix}:reload`,
        description: "",
        permissionLevel: CommandPermissionLevel.Owner,
        mandatoryParameters: [],
        optionalParameters: [],
        // @ts-ignore
    }, (origin, ...args) => {
        reload();
    });

    // stop
    customCommandRegistry.registerCommand({
        name: `${prefix}:stop`,
        description: "",
        permissionLevel: CommandPermissionLevel.GameDirectors,
        mandatoryParameters: [],
        optionalParameters: [],
        // @ts-ignore
    }, (origin, ...args) => {
        stop();
    });

    // restart
    customCommandRegistry.registerCommand({
        name: `${prefix}:restart`,
        description: "",
        permissionLevel: CommandPermissionLevel.GameDirectors,
        mandatoryParameters: [],
        optionalParameters: [],
        // @ts-ignore
    }, (origin, ...args) => {
        restart();
    });

    // backup
    customCommandRegistry.registerCommand({
        name: `${prefix}:backup`,
        description: "",
        permissionLevel: CommandPermissionLevel.GameDirectors,
        mandatoryParameters: [],
        optionalParameters: [],
        // @ts-ignore
    }, (origin, ...args) => {
        backup();
    });

    // update
    customCommandRegistry.registerCommand({
        name: `${prefix}:update`,
        description: "",
        permissionLevel: CommandPermissionLevel.GameDirectors,
        mandatoryParameters: [],
        optionalParameters: [],
        // @ts-ignore
    }, (origin, ...args) => {
        update();
    });

    // transfer
    customCommandRegistry.registerCommand({
        name: `${prefix}:transfer`,
        description: "",
        permissionLevel: CommandPermissionLevel.GameDirectors,
        mandatoryParameters: [
            {
                type: CustomCommandParamType.PlayerSelector,
                name: "selector"
            },
            {
                type: CustomCommandParamType.String,
                name: "host"
            },
            {
                type: CustomCommandParamType.Integer,
                name: "port"
            }
        ],
        optionalParameters: [],
        // @ts-ignore
    }, (origin, ...args) => {
        const entityOptions = args[0];
        const host = args[1];
        const port = args[2];

        for (const entityOption of entityOptions) {
            const entity = world.getEntity(entityOption.id);

            if (entity instanceof Player) {
                const playerName = entity.name;

                transfer(playerName, host, port);
            }
        }
    });

    // kick
    customCommandRegistry.registerCommand({
        name: `${prefix}:kick`,
        description: "",
        permissionLevel: CommandPermissionLevel.GameDirectors,
        mandatoryParameters: [
            {
                type: CustomCommandParamType.PlayerSelector,
                name: "selector"
            },
            {
                type: CustomCommandParamType.String,
                name: "reason"
            }
        ],
        optionalParameters: [],
        // @ts-ignore
    }, (origin, ...args) => {
        const entityOptions = args[0];
        const reason = args[1];

        for (const entityOption of entityOptions) {
            const entity = world.getEntity(entityOption.id);

            if (entity instanceof Player) {
                const playerName = entity.name;

                kick(playerName, reason);
            }
        }
    });

    // allowlist
    customCommandRegistry.registerEnum(`${prefix}:allowlist_type`, ["add", "remove"]);
    customCommandRegistry.registerCommand({
        name: `${prefix}:allowlist`,
        description: "",
        permissionLevel: CommandPermissionLevel.GameDirectors,
        mandatoryParameters: [
            {
                type: CustomCommandParamType.Enum,
                name: `${prefix}:allowlist_type`
            },
            {
                type: CustomCommandParamType.String,
                name: "name"
            }
        ],
        optionalParameters: [
            {
                type: CustomCommandParamType.Boolean,
                name: "igLimit"
            }
        ],
        // @ts-ignore
    }, (origin, ...args) => {
        const type = args[0];
        const name = args[1];
        const igLimit = args[2];

        allowlist(type, name, igLimit);
    });
});