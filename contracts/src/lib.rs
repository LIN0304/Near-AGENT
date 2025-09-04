use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use near_sdk::{env, near_bindgen, AccountId, PanicOnDefault, BorshStorageKey};

#[derive(BorshStorageKey, BorshSerialize, BorshDeserialize)]
enum StorageKey {
    Agents,
    Codehashes,
    Once,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    owner: AccountId,
    registered_agents: LookupMap<AccountId, bool>,
    approved_codehashes: LookupMap<Vec<u8>, bool>,
    once_map: LookupMap<Vec<u8>, bool>,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(owner: AccountId) -> Self {
        Self {
            owner,
            registered_agents: LookupMap::new(StorageKey::Agents),
            approved_codehashes: LookupMap::new(StorageKey::Codehashes),
            once_map: LookupMap::new(StorageKey::Once),
        }
    }

    pub fn register_agent(&mut self, agent: AccountId) {
        self.assert_owner();
        self.registered_agents.insert(&agent, &true);
    }

    pub fn approve_codehash(&mut self, codehash: Vec<u8>) {
        self.assert_owner();
        self.approved_codehashes.insert(&codehash, &true);
    }

    pub fn request_signature(&mut self, event: Vec<u8>) -> bool {
        assert!(self.once_map.insert(&event, &true).is_none(), "event already processed");
        true
    }

    fn assert_owner(&self) {
        assert_eq!(env::predecessor_account_id(), self.owner, "Only owner");
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::VMContextBuilder;
    use near_sdk::testing_env;

    fn context(predecessor: &str) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(AccountId::new_unvalidated(predecessor.to_string()));
        builder
    }

    #[test]
    fn test_register_agent() {
        let mut ctx = context("owner.testnet");
        testing_env!(ctx.build());
        let mut contract = Contract::new(AccountId::new_unvalidated("owner.testnet".to_string()));

        ctx = context("owner.testnet");
        testing_env!(ctx.build());
        contract.register_agent(AccountId::new_unvalidated("agent.testnet".to_string()));

        assert!(contract
            .registered_agents
            .get(&AccountId::new_unvalidated("agent.testnet".to_string()))
            .unwrap());
    }

    #[test]
    fn test_approve_codehash() {
        let mut ctx = context("owner.testnet");
        testing_env!(ctx.build());
        let mut contract = Contract::new(AccountId::new_unvalidated("owner.testnet".to_string()));

        ctx = context("owner.testnet");
        testing_env!(ctx.build());
        contract.approve_codehash(vec![1, 2, 3]);

        assert!(contract.approved_codehashes.get(&vec![1, 2, 3]).unwrap());
    }
}
