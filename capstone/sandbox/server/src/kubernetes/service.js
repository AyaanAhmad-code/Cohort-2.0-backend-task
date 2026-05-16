import { k8sCoreV1Api } from './config.js';

export const createService = async (sanboxId) => {
    const serviceManifest = {
        metadata: {
            name: `sandbox-service-${sanboxId}`,
            labels: {
                app: 'sandbox',
                sandboxId: sanboxId
            }
        },
        spec: {
            selector: {
                app: 'sandbox',
                sandboxId: sanboxId
            },
            ports: [
                {
                    name: 'http',
                    port: 80,
                    targetPort: 5173,
                    protocol: 'TCP'
                }
            ],
            type: 'ClusterIP'
        }
    }

    const response = await k8sCoreV1Api.createNamespacedService({
        namespace: "default",
        body: serviceManifest
    })

    return response;
}