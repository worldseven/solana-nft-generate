import React from "react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    getLedgerWallet,
    getPhantomWallet,
    getSlopeWallet,
    getSolflareWallet,
    getSolletExtensionWallet,
    getSolletWallet,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

interface SolanaProviderPropType {
    children: React.ReactNode
}

const SolanaProvider: React.FC<SolanaProviderPropType> = ({ children }) => {
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint
    const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
    // Only the wallets you configure here will be compiled into your application
    const wallets = React.useMemo(
        () => [
            getPhantomWallet(),
            getSlopeWallet(),
            getSolflareWallet(),
            getLedgerWallet(),
            getSolletWallet({ network }),
            getSolletExtensionWallet({ network }),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default SolanaProvider;