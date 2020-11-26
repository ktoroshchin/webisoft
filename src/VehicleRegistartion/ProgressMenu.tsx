import * as React from 'react'
import { Grid, Menu } from 'semantic-ui-react'
import './ProgressMenu.css'
import { createResizeObserver } from './resizeObserver'

export interface IProgressBarItem {
  label: string
}

interface IProgressBarProps {
  items: IProgressBarItem[]
} 

export const ProgressMenu = (props: IProgressBarProps): React.ReactElement => {
  const { items } = props
  const progressItemsRef = React.useRef<HTMLDivElement>(null)
  const [progressBarWidth, setProgressBarWidth] = React.useState<string>('0px')
  

  React.useLayoutEffect(() => {
    const calculateWidth = (): void => {
      if(progressItemsRef.current && progressItemsRef.current.firstElementChild) {
        const progressItems = progressItemsRef.current.getBoundingClientRect()
        const vehicleItem = progressItemsRef.current?.firstElementChild.getBoundingClientRect()
        
        const gap = vehicleItem.left-progressItems.left
        setProgressBarWidth(`${progressItems.left + gap + (vehicleItem.width/2)}` + 'px')
      }
    }
    if (progressItemsRef.current) {
      const resizeObserver = createResizeObserver(calculateWidth)
      resizeObserver.observe(progressItemsRef.current)
    }
  },[])

  return (
    <>
      <div className='progress_menu_container'>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column width={3} className='logo'>
              <Menu.Item header>LOGO</Menu.Item>
            </Grid.Column>

            <Grid.Column width={10}>
              <div className='progress_items' ref={progressItemsRef}>
                {(
                  items.map((element, index) => {
                    return (
                      <Menu.Item
                        className={element.label.toLocaleLowerCase()}
                        key={index}
                        name={element.label}
                      />
                    )
                  })
                )}
              </div>
            </Grid.Column>

            <Grid.Column width={3}>
              <div className='step_counter'>1/4</div>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </div>
      <div className='progress_bar' style={{ width: progressBarWidth }}></div>
    </>
  )
}