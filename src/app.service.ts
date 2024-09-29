import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  converse(data: any): Observable<any> {
    console.log(data);

    const prompt = data.prompt
      .replace(/{{data.length}}/g, data.length)
      .replace(/{{data.tonality}}/g, data.tonality)
      .replace(/{{data.client}}/g, data.client)
      .replace(/{{data.site}}/g, data.site)
      .replace(/{{data.message}}/g, data.message);

    console.log(prompt);

    // const modelId = 'mistral.mistral-large-2402-v1:0";
    const modelId = data.modelId ?? 'anthropic.claude-3-sonnet-20240229-v1:0';
    const client = new BedrockRuntimeClient();
    const conversation: any = [{
        role: "user",
        content: [{ text: prompt }],
    }];
  
    // Create a command with the model ID, the message, and a basic configuration.
    const command = new ConverseCommand({
      modelId,
      messages: conversation,
      inferenceConfig: { maxTokens: 1024, temperature: 0, topP: 0.9 },
    });

    return new Observable<any>((observer) => {
      client.send(command).then((response) => {
        console.log(response.output.message.content[0].text);
        observer.next(response);
        observer.complete();
      }).catch((err) => {
        console.log(`ERROR: Can't invoke '${modelId}'. Reason: ${err}`);
        observer.error(err);         // Emit an error if it fails
      });
    });
  }
}
