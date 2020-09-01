import React, { useCallback, useState } from 'react'
import { graphql } from 'react-apollo'
import { Issue, Article } from '@/types'
import { ISSUE_LIST_QUERY } from '@/store/query'

import styles from './index.css';
import { ARTICLE_UPDATE_MUTATION } from '../EditSection/PublishBtn';

export interface EditIssueSelectProps {
    value?: string;
    onChange: (value: string) => void;
}

const EditIssueSelect = graphql<EditIssueSelectProps, { issues: Issue[] }>(ISSUE_LIST_QUERY)(({ data: { issues = [], loading = false }, onChange, value }) => {
    const [issueId, setIssueId] = useState(value || '')
    const onHandleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = evt.target.value || ''
        setIssueId(newValue)
        onChange(newValue)
    }

    return (
        <select className={styles.box} onChange={onHandleChange} value={issueId}>
            <option key="empty" value="">请选择</option>
            {
                issues.map(issue => (
                    <option key={issue.id} value={issue.number}>{`#${issue.number} ${issue.title}`}</option>
                ))
            }
        </select>
    )
})

const EditIssueSelectWithMutate = graphql<{ data: Article }>(ARTICLE_UPDATE_MUTATION)(({ data, mutate }) => {
    const onChange = useCallback((issueId: string) => {
        mutate({
            variables: { ...data, issueId },
        })
    }, [data])

    return <EditIssueSelect onChange={onChange} value={data.issueId} />
})

export default EditIssueSelectWithMutate
