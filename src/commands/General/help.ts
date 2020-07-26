import { Command, Arg, Bot, types, Util } from "../../../lib";
import { Message } from "discord.js";
import ms from "ms";
import { PermissionString } from "discord.js";

export default class extends Command {
  constructor (client: Bot) {
    super(client, {
      name: "help",
      aliases: ["commands", "cmds"],
      category: "General",
      description: "View all the commands for this bot",
      examples: ["ping", "Music"],
      args: [new Arg("command|category", "The command or category to search for")],
      botPerms: ["SEND_MESSAGES"],
      __filename
    });
  }

  /**
   * @param {Message} msg The message that fired this command
   * @param {types.ICommandOptsRun} commandArgs The arguments run with every command
   * @param {Command} commandArgs.command The command that was run
   * @param {Array<string>} commandArgs.args The arguments run with the command
   * @param {object} commandArgs.flags The flags run for the command
   * @returns {Promise<types.ICommandOptsDone>} The success status object
   * @public
   */
  public async run(msg: Message, { command, args, flags }: types.ICommandOptsRun): Promise<types.ICommandOptsDone> {
    const commands = msg.client.cmd.commands;
    const aliases = msg.client.cmd.aliases;

    if (!args[0]) {
      const embed = msg.embed();
      const categories: Array<string> = [... new Set(commands.map(cmd => cmd.opts.category.toLowerCase()))];

      for (const category of categories) {
        const categoryCommands = commands.filter(cmd => cmd.opts.category.toLowerCase() === category);
        if (!categoryCommands) continue;

        embed.addField(`${msg.emoji(category)} ${Util.capitalise(category)}`, categoryCommands.map(c => `\`${c.opts.name}\``).join(", "));
      }

      await msg.channel.send(embed);
      return { done: true };
    } else {
      const command = commands.get(args.join(" ")) ?? aliases.get(args.join(" "));
      if (!command) return await msg.warn(`I could not find a command with that name! Use \`${msg.client.prefix}${this.opts.name}\` for a full list of commands`);

      const formatPerms = (perms: Array<PermissionString>) => perms?.map((perm) => Util.capitalise(perm.replace(/_+/gi, " "))).join(", ") || "None";

      const opts = command.opts;
      const embed = msg.embed()
        .addField(Util.capitalise(`${opts.category}: ${opts.name}`), `\`\`\`dust\n${msg.client.prefix}${opts.name} ${opts.usage}\`\`\`${opts.description}`)
        .addField("Options", `\`\`\`md\n- Aliases: ${opts.aliases?.join(", ") || "None"}\n- Cooldown: ${ms(ms(opts.cooldown), { long: true })}\n- Developer Only: ${opts.devOnly ? "Yes" : "No"}\`\`\``)
        .addField("User Permissions", formatPerms(opts.userPerms))
        .addField("Bot Permissions", formatPerms(opts.botPerms))
        .addField("Arguments", `\`\`\`dust\n${opts.args?.map(a => `${Util.formatArg(a)} ${a.desc}`).join("\n") || "None"}\`\`\``)
        .addField("Examples", opts.examples?.map(ex => `${msg.client.prefix}${opts.name} ${ex}`).join("\n") || "None")
        .setFooter("{ Required } | < Optional >");

      await msg.channel.send(embed);
      return { done: true };
    }
  }
}
