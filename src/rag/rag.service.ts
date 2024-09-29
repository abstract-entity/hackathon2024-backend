import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BedrockAgentRuntimeClient, RetrieveAndGenerateCommand} from "@aws-sdk/client-bedrock-agent-runtime";

@Injectable()
export class RagService {

    converse(data: any): Observable<any> {

        console.log(data);
    
        const prompt = data.prompt
          .replace(/{{data.length}}/g, data.length)
          .replace(/{{data.tonality}}/g, data.tonality)
          .replace(/{{data.client}}/g, data.client)
          .replace(/{{data.site}}/g, data.site)
          .replace(/{{data.message}}/g, data.message);
    
        console.log(prompt);

        const client = new BedrockAgentRuntimeClient({ region: 'eu-west-3' });
        
        const retrieveAndGen = new RetrieveAndGenerateCommand({
          input: { text: prompt },
          retrieveAndGenerateConfiguration: {
            type: "KNOWLEDGE_BASE",
            knowledgeBaseConfiguration: {
              knowledgeBaseId: "JT6ZU7CBGO",
              modelArn: "arn:aws:bedrock:eu-west-3::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0",
            }
          }
        });

        return new Observable<any>((observer) => {
            client.send(retrieveAndGen).then((response) => {
                console.log(response);
                observer.next(response);
                observer.complete();
            }).catch((err) => {
                observer.error(err);
            });
        });

    }
}




