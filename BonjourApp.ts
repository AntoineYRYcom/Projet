import {
    IAppAccessors,
    ILogger,
    IConfigurationExtend,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands/index';

export class BonjourApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
        configuration.slashCommands.provideSlashCommand(this.getHelloCommand());
    }

    private getHelloCommand(): ISlashCommand {
        return {
            command: 'Bonjour',
            i18nDescription: 'La commande renvoie Bonjour !',
            i18nParamsExample: 'params',
            providesPreview: false,
            executor: this.onHelloCommand.bind(this),
        };
    }
    private async onHelloCommand(context, read, modify): Promise<void> {
        this.getLogger().debug('Execution de la commande bonjour');
    
        // Récupérer les arguments passés avec la commande
        const args = context.getArguments();
    
        let userName = 'Utilisateur';
    
        
        if (args.length > 0) {
            userName = args[0]; // Utiliser le premier argument comme nom
        }
    
        const messageContent = `Bonjour ${userName} !`;
    
        const messageBuilder = modify.getCreator().startMessage()
            .setRoom(context.getRoom())
            .setText(messageContent);
    
        await modify.getCreator().finish(messageBuilder);
    }
    
    
}
    

